from flask import request, jsonify
from flask_restful import Resource, reqparse

import json

from utils import jsonify
from nn import rest_use

class UseNN(Resource):

	def post(self):
		image = request.get_json(force=True)["data"]

		result = rest_use.use_nn(image)
		#print(result)

		return result[0].tolist()
