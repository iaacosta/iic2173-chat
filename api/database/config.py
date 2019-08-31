import sqlite3
from os.path import join
from flask import g
from helpers import get_dirname

DB_PATH = join(get_dirname(__file__), 'db.sqlite3')


def get_database():
    db = getattr(g, '_db', None)
    if db is None:
        db = g._db = connection()
    return db


def connection():
    return sqlite3.connect(DB_PATH)
