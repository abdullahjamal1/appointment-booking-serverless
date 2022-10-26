from libs import trycourier
import os

client = trycourier.Courier(auth_token=os.environ.get('COURIER_API_AUTH_TOKEN'))

def send_mail(to_email, name, title, body):

    client.send_message(
    message={
        "to": {
        "email": to_email,
        },
        "content": {
        "title": title,
        "body": body,
        },
        "data": {
        "name": name,
        },
        "routing": {
        "method": "single",
        "channels": ["email"],
        },
    }
    )

__all__ = [
    "send_mail"
]