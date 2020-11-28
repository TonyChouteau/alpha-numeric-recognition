from nn import use
from nn import generate

import sys

for i in range(len(sys.argv)):
	arg = sys.argv[i]
	if (i > 0):
		if (arg == "g" or arg == "generate"):
			generate.generate_nn()
		elif (arg == "u" or arg == "use"):
			use.use_nn()