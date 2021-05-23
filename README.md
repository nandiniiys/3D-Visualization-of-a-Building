# 3D Visualization of a Building

## To run the 3D Visualization of the UMass Boston McCormack Building
Open a new tab on any browser you would like to use and navigate to the following URL:

```
https://nandiniiys.github.io/LiteMckViewable/index.html
```

## To run the 3D Visualization of your own building data
Clone the following repository to your Desktop:
```
https://github.com/nandiniiys/3D-Visualization-of-a-Building
```
Add your IFC building files to the LiteViewableGen folder. The IFC files can either be pre-existing or can be created using architectural software such s Autodesk Revit.
Ensure that all the files are named consistently in the format: **<buildingname>.<floor#>**
Note: Ensure no preceeding zeros in the floor numbering.
  
Run the following comand on the terminal:
```
python3 modelGen.py <buildingname> <numofFloors>
```
An index.html file will be generated within the same folder at completion of this script run, launch the index.html file using python local testing server to visualize your building.
  
To use Github pages to deploy the index.html file, create a new Repository containing only the XKT and JSON files within the models folder, the src folder, and the index.html file. You can then activate Github pages on the new repo and use pages to launch the site.

## Project Information and Credits
**Thesis Advisor:** [Professor Daniel Haehn](https://danielhaehn.com) <br/>
**Thesis Mentor:** [Loraine Franke](https://github.com/lorifranke)
  
I would like to thank my Thesis Advisor, Professor Daniel Haehn and my Thesis Mentor, Loraine Franke for guiding me throughout the project. I would like to thank them for sharing their knowledge in this field, exposing me to new technologies and new approaches towards solving problems, and most of all for their patience through all my ups and downs in this project.

We thank the Assistant Campus Planner at the University of Massachusetts Boston - Simon Myles - for providing us with access to the campus blueprints, creator of Xeokit at Xeolabs - Lindsay Kay - for his help in learning how to use aspects of the Xeokit APIs, and one of the authors of the Deep Floor Plan Recognition using a Multi-task Network with Room-boundary-Guided Attention ICCV paper, Zhiliang Zeng - for his advice and support in learning how to adapt the code associated with the paper to our dataset. We thank them all for their patient and informative assistance throughout the course of this project.

## Cite this
```
@article{nandiniiys2021BSthesis,
  title={3D Visualization of a Building},
  author={Yeleswarapu, Nandinii and Franke, Loraine and Haehn, Daniel},
  year={2021}
}
```

