import json
import os
from flask import Blueprint
from flask_cors import cross_origin

default_blueprint = Blueprint('default', __name__)


@default_blueprint.route('/')
@cross_origin()
def get_messages():
    return json.dumps('HEALTHY')