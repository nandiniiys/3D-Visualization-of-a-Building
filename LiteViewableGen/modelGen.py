import webbrowser
import os
import sys

file = sys.argv[1]
floors = sys.argv[2]

src = ''
for floor in range(1, int(floors)):
	src += file + str(floor)
	os.system('python ifcToxkt.py ' + src)
	src = ''

os.system('python htmlGen.py ' + file + ' ' + floors)

#Change path to reflect file location
filename = 'file:///Users/username/Desktop/programming-historian/' + 'index.html'
webbrowser.open_new_tab(filename)