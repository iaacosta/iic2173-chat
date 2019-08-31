from flask import Flask
from controllers import messages_blueprint

app = Flask(__name__)
app.register_blueprint(messages_blueprint, url_prefix='/api/messages')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
