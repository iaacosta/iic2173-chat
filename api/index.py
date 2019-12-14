from flask import Flask, g
from flask_cors import CORS
from controllers import messages_blueprint


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(messages_blueprint, url_prefix='/api/messages')


@app.teardown_appcontext
def close_database(expection):
    db = getattr(g, '_db', None)
    if db is not None:
        db.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0")
