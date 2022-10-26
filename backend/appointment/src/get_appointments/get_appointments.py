from array import ArrayType, array
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


metrics = Metrics(namespace=os.environ["POWERTOOLS_METRICS_NAMESPACE"],
                  service=os.environ["POWERTOOLS_SERVICE_NAME"])

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
cognito_client = boto3.client('cognito-idp')

table = dynamodb.Table(os.environ["TABLE_NAME"])
USER_POOL_ID = os.environ['USERPOOL_ID']

tracer = Tracer()

@tracer.capture_lambda_handler
@metrics.log_metrics()
def lambda_handler(event, context):
    """
    request_parameters:
        - doctorId
    """

    user_id = cognito_user_id(event)
    if user_id is None:
        # Logger.warning("User ARN not found in event")
        return res.status(401).send("Unauthorized")

    doctor_id = event.get('queryStringParameters').get('doctorId')

    try:
        response = table.query(KeyConditionExpression = Key('doctorId').eq(doctor_id) 
            and key('appointmentId').begins_with(user_id))

    except ClientError as ex:
        return res.status(400).send(ex.response['Error']['Message'])

    return res.send(response['Items'])
