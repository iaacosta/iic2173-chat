import json
import os
import boto3
from datetime import datetime
from flask import Blueprint, render_template, request, abort
from flask_cors import cross_origin
from database import get_database
from models import Message

messages_blueprint = Blueprint('messages', __name__)


@messages_blueprint.route('', methods=['POST'])
@cross_origin()
def post_message():
    data = request.get_json()
    content = data.get('content')
    user = data.get('user')

    if content is None:
        abort(400)

    try:
        message = Message(content, user)
        message.save()
        return 'OK'
    except Exception as e:
        abort(500)


@messages_blueprint.route('/')
@cross_origin()
def get_messages():
    message = Message()
    messages = map(lambda t: {
        'id': t[0],
        'date': int(datetime.strptime(t[1], '%Y-%m-%d %H:%M:%S').timestamp()
                    * 1000),
        'user': t[2],
        'content': t[3]}, message.all())
    return json.dumps(list(messages))


@messages_blueprint.route('/test')
@cross_origin()
def test():
    client = boto3.client(
        'lambda',
        aws_access_key_id=os.environ['AWS_IAM_ID'],
        aws_secret_access_key=os.environ['AWS_IAM_SECRET'],
        region_name=os.environ['AWS_REGION']
    )

    response = client.invoke(
        FunctionName="exampleFunction", InvocationType="RequestResponse")

    return response["Payload"].read().decode('utf-8')
