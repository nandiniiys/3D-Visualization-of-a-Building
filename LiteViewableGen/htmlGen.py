import sys

file = sys.argv[1]
floors = int(sys.argv[2]) + 1


index = open('index.html','w')
template = open('htmlTemplate.txt', 'r')
Lines = template.readlines()
template.close()

for line in Lines:
	index.write("{}\n".format(line.strip().replace("$tab$", "	")))

for floor in range(1, floors):
	index.write("	const {}{} = xktLoader.load(".format(file, floor))
	index.write("{\n")
	index.write("		id: \"myModel{}\",\n".format(floor))
	index.write("		src: \"./models/{}{}.xkt\",\n".format(file, floor))
	index.write("		metaModelSrc: \"./models/{}{}.json\",\n".format(file, floor))
	index.write("		position: [0, 0, 0],\n")
	index.write("		edges: true\n")
	index.write("	});\n")

index.write("</script>\n</html>")
index.close()