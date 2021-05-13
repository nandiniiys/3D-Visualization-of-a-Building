import webbrowser
import os
import sys

file = sys.argv[1]
floors = sys.argv[2]

src = ''
for floor in range(1, int(floors) + 1):
	src += file + str(floor)
	os.system('python ifcToxkt.py ' + src)
	src = ''

os.system('python htmlGen.py ' + file + ' ' + floors)
