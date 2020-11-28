from keras.datasets import mnist

def load_data():
	(train_images, train_labels), (test_images, test_labels) = mnist.load_data()
	
	train_images = train_images.reshape((60000, 28, 28, 1))
	test_images = test_images.reshape((10000, 28, 28, 1))
	train_images = train_images.astype('float32') / 255
	test_images = test_images.astype('float32') / 255

	return (train_images, train_labels), (test_images, test_labels)