// Core Assets
var sceneWebgl = new THREE.Scene();
var cameraWip = new THREE.PerspectiveCamera(90 ,window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraTour = new THREE.PerspectiveCamera(55 ,window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraMemorial = new THREE.PerspectiveCamera(90 ,window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

function initWotScene(){
    // Init Render Setup & Helper Axis
    var wotAxis = new THREE.AxisHelper(50);
    sceneWebgl.add(wotAxis);

    var containerWidth = document.getElementById('wot-webgl').offsetWidth;
    var containerHeight = document.getElementById('wot-webgl').offsetHeight;
    renderer.setClearColor(0xc6f0ff);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(containerWidth, containerHeight);
    renderer.shadowMap = true;

    // Scene Object Setup
    var geoGround = new THREE.PlaneGeometry(60,30,1,1);
    var matGround = new THREE.MeshLambertMaterial(255, 0,0);
    var trsGround = new THREE.Mesh(geoGround, matGround);
    trsGround.name = 'trsGround';
    trsGround.receiveShadow = true;
    sceneWebgl.add(trsGround);

    // Lighting
    var lgtSun = new THREE.PointLight(0xffffff);
    lgtSun.position.set(0,10,0);
    lgtSun.castShadow = true;
    lgtSun.name='lgtSun';
    sceneWebgl.add(lgtSun);

    // Camera
    currentCamera = cameraWip;
    // currentCamera.position.set(0,5,7);
    currentCamera.position.x = -15;
    currentCamera.position.y = 10;
    currentCamera.position.z = 10;
    currentCamera.lookAt(sceneWebgl.position);
    sceneWebgl.add(currentCamera);

    function renderNextFrame(){
        requestAnimationFrame(renderNextFrame); // Call this recursively to keep drawing new frames.
        renderer.render(sceneWebgl, cameraWip);
    }

    // Render to DOM.
    document.getElementById('wot-webgl').appendChild(renderer.domElement);
    renderNextFrame();

}

window.onload = initWotScene();