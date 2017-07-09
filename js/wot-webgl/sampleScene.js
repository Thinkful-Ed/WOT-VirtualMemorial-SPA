// Core Scene Obj Declarations.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

function init(){
// ===================================================== Core Setup
    var stats = initStats(); //Stats, pulled from internal Fn declaration.

    // Helper axis
    var axes = new THREE.AxisHelper(20);
    scene.add(axes); //Add axis to scene

    // Render Setup
    renderer.setClearColor(0xEEE); // Scene bg color
    renderer.setSize(window.innerWidth, window.innerHeight); // Windows w/h
    renderer.shadowMapEnabled = true; // Enable shadow mapping

// ===================================================== Scene Objects
    //Scene Objects.
    var meshPlane = new THREE.PlaneGeometry(60, 20,1,1);
    var matPlane = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var objPlane = new THREE.Mesh(meshPlane, matPlane);
    objPlane.receiveShadow = true;
    // objPlane.rotation.x = 0;
    objPlane.rotation.set(0,0,0);
    objPlane.position.x = 15;
    objPlane.position.x = 0;
    objPlane.position.x = 0;
    scene.add(objPlane); // Add to scene for rendering

    var meshCube = new THREE.BoxGeometry(4,4,4);
    var matCube = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
    var objCube = new THREE.Mesh(meshCube, matCube);
    objCube.castShadow = true;
    objCube.position.x = -4;
    objCube.position.y = 3;
    objCube.position.z = 5;
    scene.add(objCube);

    var meshSphere = new THREE.SphereGeometry(4,20, 20);
    var matSphere = new THREE.MeshPhongMaterial({color: 0x7777ff, wireframe: false});
    var objSphere = new THREE.Mesh(meshSphere, matSphere);
    objSphere.castShadow = true;
    objSphere.position.x = 20;
    objSphere.position.y = 4;
    objSphere.position.z = 2;
    scene.add(objSphere); // Add to scene for rendering

// ===================================================== Lighting & Rendering
    //Lighting
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(50, 60, 100);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Camera Scene Setup
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.rotation.set(0,0,90);
    camera.lookAt(scene.position);
    // camera.lookAt(objSphere.position);

// ===================================================== Animation
    var step = 0; // Defines the speed of the ball bounce
    function renderScene(){
        stats.update(); // Let stats know we are in a new render cycle.

        // Animation - Sphere
        step += 0.04;
        objSphere.position.x = 20+(Math.cos(step));
        objSphere.position.y = 2+(10*Math.abs(Math.sin(step)));
        // Animation - Cube
        objCube.rotation.x += .02;
        objCube.rotation.y += .02;
        objCube.rotation.z += .02;

        requestAnimationFrame(renderScene); // Call this recursively to keep drawing new frames.
        renderer.render(scene, camera); // Tell WebGL to render again.
    }

    // Add the scene to the DOM
    document.getElementById('webgl-output').appendChild(renderer.domElement);
    // renderer.render(scene, camera); // Tell the render to draw the scene and which camera to use. Render a frame, does not keep rendering frames.
    //Call the function instead of using the imperative code above.
    renderScene();
}
function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;