from flask import Flask
from controllers import index_blueprint

app = Flask(__name__)
app.register_blueprint(index_blueprint)

if __name__ == "__main__":
    app.run()
