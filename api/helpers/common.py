from datetime import datetime
import os


def get_dirname(file):
    return os.path.dirname(os.path.realpath(file))


def logger(message):
    print(f'[{datetime.now()}] {message}')
