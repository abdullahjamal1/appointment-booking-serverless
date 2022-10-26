from array import ArrayType, array
from datetime import datetime
import os
import html
import uuid
import time
import json
from boto3.dynamodb.conditions import Key
from typing import Dict, List
import boto3
from apigateway import res  # pylint: disable=import-error
from botocore.exceptions import ClientError
from datetime import date
# from apigateway.apigateway import res
import xml.etree.ElementTree as ET
import logging
import random
from urllib.parse import quote
from aws_lambda_powertools import Metrics
from aws_lambda_powertools.metrics import MetricUnit
from aws_lambda_powertools import Tracer
from apigateway import cognito_user_id, iam_user_id
from courier_adaptor import send_mail as send_email


metrics = Metrics(namespace=os.environ["POWERTOOLS_METRICS_NAMESPACE"],
                  service=os.environ["POWERTOOLS_SERVICE_NAME"])

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
cognito_client = boto3.client('cognito-idp')

appointments_table = dynamodb.Table(os.environ["APPOINTMENTS_TABLE_NAME"])
doctors_table = dynamodb.Table(os.environ["DOCTORS_TABLE_NAME"])

USER_POOL_ID = os.environ['USERPOOL_ID']

def calculate_age(birthdate):
    today = date.today()
    return (today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day)))


def get_user_info(sub):
    """
    fetch user with sub from cognito pool

    returns user object with gender, birthdate
    """

    user = cognito_client.list_users(
        UserPoolId=USER_POOL_ID,
        Filter=f'sub = "{sub}"'
    )['Users'][0]

    for attribute in user['Attributes']:
        user[attribute['Name']] = attribute['Value']

    year, month, day = user['birthdate'].split('-')

    user['age'] = int(calculate_age( date ( int(year), int(month), int(day) ) ))

    return user

tracer = Tracer()


@tracer.capture_lambda_handler
def lambda_handler(event, context):
    """
    request_parameters:
       - doctorId
    body: {
        appointment_date: date,
        appointment_slot: slot,
    } 
    """

    user_id = cognito_user_id(event)
    if user_id is None:
        # Logger.warning("User ARN not found in event")
        return res.status(401).send("Unauthorized")

    body = event.get('body')
    doctor_id = event.get('queryStringParameters').get('doctorId')

    try:
        body = json.loads(body)

    except Exception as ex:
        return res.status(400).send("Invalid Json")

    user = get_user_info(user_id)
    logger.info('user = %s', user)

    slot = body['appointment']['slot']
    date = body['appointment']['date']

    try:

      #validate appointmentSlot
    #   response = appointments_table.query(KeyConditionExpression = Key('doctorId').eq(doctor_id) 
    #         and Key('appointmentId').contain('{date}-{slot}'))

    #   if(response is not None and response['Items'] is not None):
    #         return res.status(400).send('slot {slot} on date {date} is already booked')

       #validate doctorId
       response = doctors_table.query(KeyConditionExpression = Key('doctorId').eq(doctor_id))

       if(response is None or response['Items'][0] is None):
            return res.status(400).send('invalid doctor Id')

       doctor = response['Items'][0]
       body['doctorId'] = str(uuid.uuid4())
       body['appointmentId'] = '{user_id}-{date}-{slot}'
       body['patient'] = {'name': user['name'], 'email': user['email']}
       body['doctor'] = {'name': doctor['name'], 'email': doctor['email']}
       body['booked_at'] = str(datetime.now())
       appointments_table.put_item(Item=body)

       #send email to patient
       speciality = doctor['speciality']
       send_email(body['patient']['email'], body['patient']['name'], 
        '{speciality} Appointment confirmation', 'Hi your booking has been confirmed')

       send_email(body['doctor']['email'], body['doctor']['name'], 
        'New Appointment | date {date} | slot {slot}', 'Hi you have received new appointment')

    except ClientError as ex:
        
        logger.info(str(ex))
        # type: ignore
        return res.status(ex.response['Error']['Code']).send(ex.response['Error']['Message'])

    return res.send(body)
