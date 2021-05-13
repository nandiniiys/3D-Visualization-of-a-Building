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
#s.system('python -m SimpleHTTPServer 8000')
os.system('python3 -m http.server 8000')

#Change path to reflect file location
filename = 'http://127.0.0.1:8000/index.html'
webbrowser.open_new_tab(filename)