from database import get_database


class Message:
    def __init__(self, content=None, user=None):
        self.connection = get_database()
        self.content = content
        self.user = user

    def save(self):
        cursor = self.connection.cursor()

        if self.user is not None:
            cursor.execute(
                'INSERT INTO messages(content, user) VALUES (?, ?)',
                (self.content, self.user))
        else:
            cursor.execute(
                'INSERT INTO messages(content) VALUES (?)',
                (self.content,))

        self.connection.commit()

    def all(self):
        cursor = self.connection.cursor()
        cursor.execute(
            'SELECT * FROM messages ORDER BY posted_on DESC LIMIT 100;')
        return cursor.fetchall()
