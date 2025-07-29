import os
import requests
from dotenv import load_dotenv
import time
# Load the environment variables from the .env file
load_dotenv()

access_token = None
expired_in = 1800
expires_at = 0

data = {
    'grant_type': 'client_credentials',
    'client_id': os.getenv('CLIENT_ID', ''),
    'client_secret': os.getenv('CLIENT_SECRET', ''),
}


def token():
    global access_token, expires_at
    response = requests.post(
        'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
        data=data,
    )
    access_token = response.json()['access_token']
    expires_at = time.time() + expired_in

   


    return response.json()['access_token']

def getAccessToken():
    if access_token is None or time.time()> expires_at:
        token()
    return access_token



