from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from rest import rest_nn_use

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/": {"origins": "*"}})

api.add_resource(rest_nn_use.UseNN, "/")

def serve():
	app.run(debug=True)