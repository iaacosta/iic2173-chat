import os
from database import connection
from sqlite3 import OperationalError
from helpers import get_dirname, logger


class Seeder:
    def __init__(self):
        self.connection = connection()

    def tear_down(self):
        logger('Dropping table "messages"')
        try:
            cursor = self.connection.cursor()
            cursor.execute("DROP TABLE messages")
            self.connection.commit()
            logger('Table "messages" deleted')
        except OperationalError:
            logger('No table "messages" found')

    def set_up(self):
        logger('Creating table "messages"')
        cursor = self.connection.cursor()
        cursor.execute("""CREATE TABLE messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            posted_on DATETIME DEFAULT (datetime('now','localtime')),
            user TEXT DEFAULT 'Anónimo', 
            content TEXT NOT NULL)""")
        self.connection.commit()
        logger('Table "messages" created')

    def close_connection(self):
        self.connection.close()

    def seed(self):
        self.tear_down()
        self.set_up()
        self.close_connection()
        logger('Done!')


if __name__ == "__main__":
    seeder = Seeder()
    seeder.seed()
