var wotScene = (function(){
    // Scene Boiler
    var scene = new THREE.Scene(); scene.name="scene";
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);// Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var renderer = new THREE.WebGLRenderer();
    var materials;
    var load_Objs = new THREE.ObjectLoader();
    var load_Tex = new THREE.TextureLoader();
    var useHelpers = true;

    function init(){
        return new Promise(function(resolve, reject){
            console.log('Init & Loading Scene Assets');
            // Helpers
            if(useHelpers===true){
                var sceneAxis = new THREE.AxisHelper(5);
                scene.add(sceneAxis);
            }

            // Window & Renderer
            var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
            var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;
            renderer.setSize(renderWindowWidth, renderWindowHeight);
            document.getElementById('webgl-container').appendChild(renderer.domElement);

            // Lighting
            var lgt_directional = new THREE.DirectionalLight(0xffffff, .85);
            var lgt_ambient = new THREE.AmbientLight(0xffffff, .65);
            scene.add(lgt_directional, lgt_ambient);

            // Camera
            camera.name = 'renCam';
            camera.position.set(0, 4.5, 70);
            camera.rotation.set(0, 0, 0);
            scene.add(camera);

            // Create Materials & Textures
            var atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas.png')});
            atlas.name = 'atlas';
            var concrete = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/concrete.jpg'), function(texture){

            }});
            concrete.name='concrete';
            var grass = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/grass.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(100, 100);
            })});
            grass.name = 'grass';
            var sandstone = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/sandstone.jpg'), function(texture){

            }});
            sandstone.name = 'sandstone';
            var stones = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/stones.jpg'), function(texture){

            }});
            stones.name = 'stones';
            var water = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/water.jpg'), function(texture){

            }});
            water.name = 'water';
            materials = {
                atlas: atlas,
                concrete: concrete,
                grass: grass,
                sandstone: sandstone,
                stones: stones,
                water: water
            }; // Package materials up in an object

            // Load Model Assets & Create Objects
            var trs_camPivot = new THREE.Object3D();
            trs_camPivot.name = 'camPivot';
            scene.add(trs_camPivot);

            // Main Scene
            load_Objs.load("./js/wot-scene/json/wot-scene-minify.json", function(obj){
                    // Add the loaded object to the scene
                    scene.add(obj);
                },
                // Function called when download progresses
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                // Function called when download errors
                function ( xhr ) {
                    console.error( 'An error happened' );
                }
            );
            render();
        });
    }
    function setMaterials(){
        console.log('Setting Materials');
        // Apply Atlas
        for(var i=0; i<scene.children[4].children.length; i++){
            scene.children[4].children[i].material = materials.atlas;
        }
        // Apply Specific Textures
        scene.getObjectByName('fountainStone').material = materials.concrete;
        scene.getObjectByName('ground').material = materials.grass;
    }
    function setParents(){
        console.log('Setting Parents');
        // Helpers
        if(useHelpers===true){
            THREE.SceneUtils.attach(scene.getObjectByName('renCam'), scene, scene.getObjectByName('camPivot'));
        }
    }
    function positionProps(){
        console.log('Positioning Props');
        // Reposition
        // scene.getObjectByName('memorialMetal').position.set(6.2,0,2.1);
    }
    function render(){
        var animCam = scene.getObjectByName('camPivot');
        try{
            if(useHelpers===true){
                animCam.rotation.y += 0.001;
            }
        }
        catch (err){
            console.log(err);
        }
        finally {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
    }

    // Expose scene obj for debugging purposes.
    return{
        scene: scene,
        camera: camera,
        init: init,
        setMaterials: setMaterials,
        setParents: setParents,
        positionProps: positionProps
    }
}());