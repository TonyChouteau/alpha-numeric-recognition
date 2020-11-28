from tensorflow.python.keras.models import load_model
import numpy as np
import random 

from utils import display
from nn import loader

def use_nn(image):
	(train_images, train_labels), (test_images, test_labels) = loader.load_data()

	#===========================================================
	## Load Model
	#===========================================================

	model_file = "models/model.hdf5"
	loaded = load_model(model_file)

	#===========================================================
	## Use Model
	#===========================================================

	n = random.randint(0, len(test_images))
	print(loaded.predict(np.array([test_images[n]])).argmax())
	display.displayImage(test_images[n].reshape(28,28))