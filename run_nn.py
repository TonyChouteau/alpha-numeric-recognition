from rest import server

import sys

arg = None
if len(sys.argv)>1:
	arg = sys.argv[1]

if (arg == "g" or arg == "generate"):
	from nn import generate
	generate.generate_nn()
elif (arg == "u" or arg == "use"):
	from nn import use
	use.use_nn()
else: #(arg == "s" or arg == "serve"):
	server.serve()