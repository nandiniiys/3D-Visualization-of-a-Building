# 3D Visualization of a Building

## To run the 3D Visualization of the UMass Boston McCormack Building
Open a new tab on any browser you would like to use and navigate to the following URL:

```
https://nandiniiys.github.io/3D-Visualization-of-a-Building/LiteMckViewable/index.html
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
An index.html file will be generated within the same folder at completion of this script run, launch the index.html file using Github pages or a python server to visualize your building.

## Project Information and Credits
**Thesis Advisor:** Professor Daniel Haehn <br/>
**Thesis Mentor:** Loraine Franke

We thank the Assistant Campus Planner at the University of Massachusetts Boston - Simon Myles - for providing us with access to the campus blueprints, creator of Xeokit at Xeolabs - Lindsay Kay - for his help in learning how to use aspects of the Xeokit APIs, and one of the authors of the Deep Floor Plan Recognition using a Multi-task Network with Room-boundary-Guided Attention ICCV paper, Zhiliang Zeng - for his advice and support in learning how to adapt the code associated with the paper to our dataset. We thank them all for their patient and informative assistance throughout the course of this project.

## Cite this
```
@article{nandiniiys2021BSthesis,
  title={3D Visualization of a Building},
  author={Yeleswarapu, Nandinii and Franke, Loraine and Haehn, Daniel},
  year={2021}
}
```

