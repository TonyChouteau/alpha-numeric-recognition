##===========================================================
## Import
##===========================================================

from keras.datasets import mnist
from keras import models
from keras import layers
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as pl

from utils import display
from nn import loader

def generate_nn():
	##===========================================================
	## Load datas
	##===========================================================

	(train_images, train_labels), (test_images, test_labels) = loader.load_data()

	##===========================================================
	## Overview of datas
	##===========================================================

	print("nb images = ",train_images.shape[0])
	print("unique label = ",np.unique(train_labels))

	num_img = 10
	# displayImage(train_images[num_img])

	##===========================================================
	## Reshape
	##===========================================================

	train_labels = to_categorical(train_labels)
	test_labels = to_categorical(test_labels)

	# print(train_labels[num_img])
	num_label = np.where(train_labels[num_img] != 0)
	#print("c est un : ", num_label)

	##===========================================================
	## Deep learning : Convolutionnal Neural Network avec Keras
	##===========================================================

	model = models.Sequential()

	# convolution : 8 filtres de dim 3 x 3
	model.add(layers.Conv2D(8, (3, 3), activation='relu', input_shape=(28, 28, 1)))
	# max pooling 2 x 2
	model.add(layers.MaxPooling2D((2, 2)))

	# convolution #2: 16 filtres de dim 3 x 3
	model.add(layers.Conv2D(16, (3, 3), activation='relu'))
	model.add(layers.MaxPooling2D((2, 2)))

	# convolution #3
	model.add(layers.Conv2D(16, (3, 3), activation='relu'))

	#===========================================================
	### Couche  de traitement *flatten* 
	#===========================================================

	model.add(layers.Flatten())

	#===========================================================
	### Couche  de traitement *dense* 
	#===========================================================

	model.add(layers.Dense(256, activation='relu'))

	#===========================================================
	### Couche  de décision
	#===========================================================

	model.add(layers.Dense(10, activation='softmax'))

	# Model result
	model.summary()

	# Compil model
	model.compile(optimizer='rmsprop',
				loss='categorical_crossentropy',
				metrics=['accuracy'])

	history = model.fit(train_images, 
			train_labels, 
			validation_split = 0.1,
			epochs = 15, 
			batch_size = 500)

	pl.figure()
	pl.plot(history.history['loss'])
	pl.plot(history.history['val_loss'])

	print(model.evaluate(test_images, test_labels))

	#===========================================================
	## Save Model
	#===========================================================

	model_file = "models/model.hdf5"
	model.save(model_file)