import sqlite3
from flask import g

DB_PATH = '/database/db.sqlite3'


def get_database():
    db = getattr(g, '_db', None)
    if db is None:
        db = g._db = sqlite3.connect(DB_PATH)
    return db


def seed():
    print('Seeding database')
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        posted_on DATETIME DEFAULT (datetime('now')),
        user TEXT DEFAULT 'Anónimo', 
        content TEXT NOT NULL)""")
    conn.commit()
