# Author: Nandinii Yeleswarapu
# File: ifcTOxkt.py
# Purpose: python script to run all neccesary commands to convert an ifc file to an xkt file


# Usage: this script needs to run within the xeokit-sdk directory which has all the tools needed for the convertion
# Run Command: python ifcTOxkt.py nameOfFile

# The commnads that this script encompasses are listen below:
# ./Ifcconvert --use-element-guids Mck02.ifc Mck02.dae --exclude=entities IfcOpeningElement
# ./COLLADA2GLTF-v2/COLLADA2GLTF-bin -i Mck02.dae -o Mck02.gltf 
# ./xeokit-gltf-to-xkt/gltf2xkt.js -s Mck02.gltf -o Mck02.xkt 
# ./xeokit-metadata-osx-x64/xeokit-metadata Mck02.ifc Mck02.json

import os
import sys

src = sys.argv[1]

ifc_dae = './Ifcconvert --use-element-guids ' + src + '.ifc' + ' ' + src + '.dae --exclude=entities IfcOpeningElement'
dae_gltf = './COLLADA2GLTF-v2/COLLADA2GLTF-bin -i ' + src + '.dae -o ' +  src + '.gltf'
gltf_xkt = './xeokit-gltf-to-xkt/gltf2xkt.js -s ' + src + '.gltf -o ' + src + '.xkt'
meta_data = './xeokit-metadata-osx-x64/xeokit-metadata ' + src + '.ifc ' + src + '.json'

print("Converting file from IFC to COLLADA\n")
os.system(ifc_dae)
print("COLLADA file created successfully\n")
print("Converting file from COLLADA to GLTF\n")
os.system(dae_gltf)
print("GLTF file created successfully\n")
print("Converting file from GLTF to XKT\n")
os.system(gltf_xkt)
print("XKT file created successfully\n")
print("Creating JSON file with metadata for the IFC file\n")
os.system(meta_data)
print("Metadata JSON file created successfully\n")

os.system('mv src.ifc ./models')
os.system('mv src.dae ./models')
os.system('mv src.gltf ./models')
os.system('mv src.xkt ./models')
os.system('mv src.json ./models')