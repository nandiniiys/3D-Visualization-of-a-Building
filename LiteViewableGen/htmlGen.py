file = sys.argv[1]
floors = sys.argv[2]

f = open('index.html','w')

def loadModels(file, floors):
	code = ""
	for floor in range(1, floors):
		code += """
			const """ +  file + floor """ = xktLoader.load({
	        id: "myModel",
	        src: "./models/""" + file + floor + """.xkt",
	        metaModelSrc: "./models/""" + file + floor + """.json", // Creates a MetaObject instances in scene.metaScene.metaObjects
	        position: [0, 0, 0],
	        edges: true
	    }); """

    return code
	

message = """ 
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>3D Vizualitaion of buildings</title>
    <style>
        html, body { 
          background-color:#000;
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden !important;  
        }

        #myCanvas {
            width: 100%;
            height: 100%;
            background: black;
        }
    </style>

</head>

<body>
<canvas id="myCanvas"></canvas>
</body>
<script type="module">

    //------------------------------------------------------------------------------------------------------------------
    // Import needed modules to load XKT models
    //------------------------------------------------------------------------------------------------------------------

    import {Viewer} from "./src/viewer/Viewer.js";
    import {XKTLoaderPlugin} from "./src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";

    // TEST TEXTURE LOADING
    import {Mesh} from "./src/viewer/scene/mesh/Mesh.js";
    import {buildTorusGeometry} from "./src/viewer/scene/geometry/builders/buildTorusGeometry.js";
    import {ReadableGeometry} from "./src/viewer/scene/geometry/ReadableGeometry.js";
    import {PhongMaterial} from "./src/viewer/scene/materials/PhongMaterial.js";
    import {Texture} from "./src/viewer/scene/materials/Texture.js";
    // END TEST 

    //------------------------------------------------------------------------------------------------------------------
    // Create a Viewer and the arrange the camera positioning
    //------------------------------------------------------------------------------------------------------------------

    const viewer = new Viewer({
        canvasId: "myCanvas",
        transparent: true
    });

    viewer.scene.camera.eye = [10.45, 17.38, -98.31];
    viewer.scene.camera.look = [43.09, 0.5, -26.76];
    viewer.scene.camera.up = [0.06, 0.96, 0.16];

    viewer.scene.selectedMaterial.fillAlpha = 0.1;

    //----------------------------------------------------------------------------------------------------------------------
    // Create an XKT loader plugin using the viewer we created earlier
    //----------------------------------------------------------------------------------------------------------------------

    const xktLoader = new XKTLoaderPlugin(viewer);

    //var t0 = performance.now();
    """ + loadModels(file, floors) + """ 
</script>
</html> """

f.write(message)
f.close()