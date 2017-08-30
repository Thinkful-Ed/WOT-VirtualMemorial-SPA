var wotScene = (function(){
    // Scene Boiler
    var scene = new THREE.Scene();
    scene.name="scene";
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);// Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var renderer = new THREE.WebGLRenderer();
    var load_Json = new THREE.JSONLoader();
    var load_Tex = new THREE.TextureLoader();

    function init(){
        // Helpers
        var sceneAxis = new THREE.AxisHelper(5);
        scene.add(sceneAxis);

        // Window Defining
        var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
        var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;

        // ================== Setup scene render
        renderer.setSize(renderWindowWidth, renderWindowHeight);
        // renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('webgl-container').appendChild(renderer.domElement);

        // ================== Lighting
        var lgt_directional = new THREE.DirectionalLight(0xffffff, .85);
        var lgt_ambient = new THREE.AmbientLight(0xffffff, .65);
        scene.add(lgt_directional, lgt_ambient);

        // ================== Camera
        camera.position.set(0, 25, -3);
        camera.rotation.set(-80,0,0);
        scene.add(camera);

        // ================== Material & Textures
        var mat_atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas.png')});
        var mat_concrete = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/concrete.jpg')});
        var mat_grass = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/grass.jpg')});
        var mat_sandstone = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/sandstone.jpg')});
        var mat_stones = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/stones.jpg')});
        var mat_water = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/water.jpg')});


        // ================== Load Model Assets
        // Ground
        load_Json.load('./js/wot-scene/json/groundsMain.json', function(geo){
            var obj_groundMain = new THREE.Mesh(geo, mat_grass);
            obj_groundMain.name = "groundMain";
            scene.add(obj_groundMain);
        });
        // Flag
        load_Json.load('./js/wot-scene/json/flag.json', function(geo){
            var obj_flag = new THREE.Mesh(geo, mat_atlas);
            obj_flag.name = "flag";
            scene.add(obj_flag);
        });

        // Fountain - Stone
        load_Json.load('./js/wot-scene/json/fountainStone.json', function(geo){
            var obj_fountainStone = new THREE.Mesh(geo, mat_stones);
            obj_fountainStone.name = 'fountainStone';
            scene.add(obj_fountainStone);
        });
        // Fountain - Sandstone
        load_Json.load('./js/wot-scene/json/fountainSandstone.json', function(geo){
            var obj_fountainSandstone = new THREE.Mesh(geo, mat_sandstone);
            obj_fountainSandstone.name = 'fountainSandstone';
            THREE.SceneUtils.attach(obj_fountainSandstone, scene, scene.getObjectByName('fountainStone'));
            scene.getObjectByName('fountainStone').add(obj_fountainSandstone);
        });
        // Fountain - Water
        load_Json.load('./js/wot-scene/json/fountainWater.json', function(geo){
            var obj_fountainWater = new THREE.Mesh(geo, mat_water);
            obj_fountainWater.name = 'fountainWater';
            scene.getObjectByName('fountainStone').add(obj_fountainWater);
        });
        // Fountain - Lights
        load_Json.load('./js/wot-scene/json/fountainLights.json', function(geo){
            var obj_fountainLights = new THREE.Mesh(geo, mat_atlas);
            obj_fountainLights.name = 'fountainLights';
            scene.getObjectByName('fountainStone').add(obj_fountainLights);
        });
        // Fountain - Decor
        load_Json.load('./js/wot-scene/json/fountainDecor.json', function(geo){
            var obj_fountainDecor = new THREE.Mesh(geo, mat_atlas);
            obj_fountainDecor.name = 'fountainDecor';
            scene.getObjectByName('fountainStone').add(obj_fountainDecor);
        });

        // Fountain - Sidewalk
        load_Json.load('./js/wot-scene/json/sidewalkFountainSmallBorder.json', function(geo){
            var objs_sidewalkFountainBorders = [];

            for(var i=0; i<=8; i++){
                objs_sidewalkFountainBorders[i] = new THREE.Mesh(geo, mat_concrete);
                objs_sidewalkFountainBorders[i].name = 'sidewalkFountainSmallBorder_0'+i;
                scene.add(objs_sidewalkFountainBorders[i]);
            }
        });
        //?!?!? Boiler ?!?!?
        /*load_Json.load('./url', function(geo){
            var obj_name = new THREE.Mesh(geo, mat_name);
            obj_name.name = 'name';
            scene.add(obj_name);
        });*/
        setPropPostions();
        render();
    }
    function setPropPostions(){
        setTimeout(function(){
            console.log('Running TRS Code');
            scene.getObjectByName('sidewalkFountainSmallBorder_01').rotation.y = 22.637624415;
        }, 5000);
    }

    //  ================== Render, Anim, & Expose
    function render(){
        try{
            // obj_groundMain.rotation.y += 0.001;
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
        init: init
    }
}());