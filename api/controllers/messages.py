import json
import os
import boto3
from datetime import datetime
from flask import Blueprint, render_template, request, abort
from flask_cors import cross_origin
from database import get_database
from models import Message

messages_blueprint = Blueprint('messages', __name__)
aws_client = boto3.client(
    'lambda',
    aws_access_key_id=os.environ['AWS_IAM_ID'],
    aws_secret_access_key=os.environ['AWS_IAM_SECRET'],
    region_name='us-east-1'
)


@messages_blueprint.route('', methods=['POST'])
@cross_origin()
def post_message():
    data = request.get_json()
    content = data.get('content')
    user = data.get('user')

    if content is None:
        abort(400)

    try:
        if os.environ['FLASK_ENV'] != 'production':
            message = Message(content, user)
            message.save()
        else:
            if user is None:
                user = 'Anónimo'

            lambda_res = aws_client.invoke(
                FunctionName="arn:aws:lambda:us-east-1:272559496018:function:createMessage",
                Payload=bytearray(json.dumps(
                    {'content': content, 'user': user}), encoding='utf-8')
            )

        return 'OK'
    except Exception as e:
        abort(500)


@messages_blueprint.route('/')
@cross_origin()
def get_messages():
    if os.environ['FLASK_ENV'] != 'production':
        message = Message()
        messages = map(lambda t: {
            'id': t[0],
            'date': int(
                datetime.strptime(t[1], '%Y-%m-%d %H:%M:%S').timestamp() * 1000
            ),
            'user': t[2],
            'content': t[3]}, message.all())
        return json.dumps(list(messages))
    else:
        lambda_res = aws_client.invoke(
            FunctionName="arn:aws:lambda:us-east-1:272559496018:function:getMessages")

        payload = json.loads(lambda_res["Payload"].read().decode('utf-8'))
        parsed_data = map(lambda t: {
            'id': t['id'],
            'date': int(
                datetime.strptime(
                    t['date'],
                    '%a %b %d %Y %H:%M:%S GMT+0000 (Coordinated Universal Time)'
                ).timestamp() * 1000
            ),
            'user': t['user'],
            'content': t['content']}, payload['body']['messages'])

        return json.dumps(list(parsed_data))
