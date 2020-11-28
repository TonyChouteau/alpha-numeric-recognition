import matplotlib.pyplot as pl

def displayImage(image):
	pl.figure()
	pl.imshow(image, cmap = pl.get_cmap('gray'))
	pl.show()
	#print(train_images[n])
	#print(len(train_images))