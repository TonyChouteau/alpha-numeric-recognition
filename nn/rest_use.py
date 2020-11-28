from tensorflow.python.keras.models import load_model
import numpy as np
import random

model_file = "models/model.hdf5"
loaded_model = load_model(model_file)

def use_nn(image):
	formated_image = np.array(image).reshape((28,28,1))
	
	return loaded_model.predict(np.array([formated_image]))