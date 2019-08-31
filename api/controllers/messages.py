from flask import Blueprint, render_template

messages_blueprint = Blueprint('messages', __name__)


@messages_blueprint.route('/')
def get_messages():
    return 'This should return messages'
