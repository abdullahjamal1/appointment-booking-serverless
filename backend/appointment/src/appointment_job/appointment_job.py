from array import ArrayType, array
from datetime import datetime
import os
import html
import uuid
import time
import json
import dateutil.parser
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

tracer = Tracer()

@tracer.capture_lambda_handler
def lambda_handler(event, context):


    try:
       #can atmost load 25 only, but just for mock purpose
       response = appointments_table.scan()
       for item in response['Items']:
           
            logger.info(str(dateutil.parser.isoparse(item['appointment']['date']).date()) + ' == ' + 
                str(datetime.now().date()))

            if dateutil.parser.isoparse(item['appointment']['date']).date() == datetime.now().date():
                
                logger.info("matched")
    
                slot = item['appointment']['slot']
    
                send_email(item['patient']['email'], item['patient']['name'], 
                    f'Clinic Appointment Reminder', f'Hi ' + item['patient']['name'] + ', you have appointment with ' + item['doctor']['name'] + ' today at ' + slot + ' .')
    
                send_email(item['doctor']['email'], item['doctor']['name'], 
                    'Appointment Reminder | slot ' + slot, f'Hi ' + item['doctor']['name'] + ', you have appointment with ' + item['patient']['name'] + ' today at ' + slot + ' .')

    except ClientError as ex:
        
        logger.info(str(ex))
        # type: ignore
        return res.status(ex.response['Error']['Code']).send(ex.response['Error']['Message'])

    return {"statusCode": 200}