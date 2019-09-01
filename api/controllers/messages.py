import json
from datetime import datetime
from flask import Blueprint, render_template, request, abort
from flask_cors import cross_origin
from database import get_database

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
        conn = get_database()
        cursor = conn.cursor()

        if user is not None:
            cursor.execute(
                'INSERT INTO messages(content, user) VALUES (?, ?)', (content, user))
        else:
            cursor.execute(
                'INSERT INTO messages(content) VALUES (?)', (content,))

        conn.commit()
        return 'OK'
    except Exception:
        abort(500)


@messages_blueprint.route('/')
@cross_origin()
def get_messages():
    cursor = get_database().cursor()
    cursor.execute('SELECT * FROM messages LIMIT 100;')
    messages = map(lambda t: {
        'id': t[0],
        'date': int(datetime.strptime(t[1], '%Y-%m-%d %H:%M:%S').timestamp()
                    * 1000),
        'user': t[2],
        'content': t[3]}, cursor.fetchall())
    return json.dumps(list(messages))
