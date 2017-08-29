var wotScene = (function(){
    // Scene Boiler
    var scene = new THREE.Scene();
    // Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);
    var renderer = new THREE.WebGLRenderer();
    var load_Json = new THREE.JSONLoader();
    var load_Tex = new THREE.TextureLoader();

    function init(){
        var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
        var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;

        // Setup scene render
        renderer.setSize(renderWindowWidth, renderWindowHeight);
        // renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('webgl-container').appendChild(renderer.domElement);

        // Lighting
        var light = new THREE.DirectionalLight(0xffffff, 3.5);
        scene.add(light);

        // Camera
        camera.position.set(10, 1, 35);
        scene.add(camera);

        // Material & Textures
        // var mat_atlas = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader.ImageLoader('./textures/atlas.png')});
        var mat_atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas.png')});

       // Load Model Assets
        load_Json.load('./js/wot-scene/_tempScene.json', function(geometry){
            wotMesh  = new THREE.Mesh(geometry, mat_atlas);
            wotMesh.name = "wotMesh";
            scene.add(wotMesh);
        });
        render();
    }

    function render(){
        try{
            // var animMesh = wotScene.scene.getObjectByName("wotMesh");
            wotMesh.rotation.y += 0.001;
        }
        catch (err){
            // console.log(err);
        }
        finally {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
    }

    // Expose scene obj for debugging purposes.
    return{
        wotScene: wotScene,
        init: init
    }
}());