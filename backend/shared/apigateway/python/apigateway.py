"""
API Gateway helpers for Lambda functions
"""

from decimal import Decimal
import json
from typing import Dict, Optional, Union
import os
from libs import cognitojwt #pylint: disable=import-error

# to add support to json serilize type decimal
class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
        return str(obj)
    return json.JSONEncoder.default(self, obj)

HEADERS = {
    "Access-Control-Allow-Origin": os.environ.get("ALLOWED_ORIGIN"),
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    "Access-Control-Allow-Credentials": True,
}

__all__ = [
    "cognito_user_id", "iam_user_id", "res", "DecimalEncoder"
]
def get_user_sub(jwt_token):
    """
    Validate JWT claims & retrieve user identifier
    """
    try:
        verified_claims = cognitojwt.decode(
            jwt_token, os.environ["AWS_REGION"], os.environ["USERPOOL_ID"]
        )
    except (cognitojwt.CognitoJWTException, ValueError):
        verified_claims = {}

    return verified_claims.get("sub")


def cognito_user_id(event: dict) -> Optional[str]:
    """
    Returns the User ID (sub) from cognito or None
    """

    try:
        return event["requestContext"]["authorizer"]["claims"]["sub"]
    except (TypeError, KeyError):
        return None


def iam_user_id(event: dict) -> Optional[str]:
    """
    Returns the User ID (ARN) from IAM or None
    """

    try:
        return event["requestContext"]["identity"]["userArn"]
    except (TypeError, KeyError):
        return None

class Response():

    def __init__(self, name=None):

        self.status_code = 200
        self._headers = HEADERS

    def send(self, payload={}):

        if isinstance(payload, str):
            payload = {"message": payload}

        response = {
            'body': json.dumps(payload, cls=DecimalEncoder),
            'statusCode': self.status_code,
            'headers': self._headers
        }

        return response

    def status(self, status_code: int = 200):

        self.status_code = status_code
        return self

    def headers(self, headers):

        self._headers = headers
        return self

res = Response()

# def response(
#         msg: Union[dict, str],
#         status_code: int = 200,
#         allow_origin: str = "*",
#         allow_headers: str = "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
#         allow_methods: str = "GET,POST,PUT,DELETE,OPTIONS"
#     ) -> Dict[str, Union[int, str]]:
#     """
#     Returns a response for API Gateway
#     """

#     if isinstance(msg, str):
#         msg = {"message": msg}

#     return {
#         "statusCode": status_code,
#         "headers": {
#             "Access-Control-Allow-Headers": allow_headers,
#             "Access-Control-Allow-Origin": allow_origin,
#             "Access-Control-Allow-Methods": allow_methods
#         },
#         "body": json.dumps(msg, cls=Encoder)
#     }