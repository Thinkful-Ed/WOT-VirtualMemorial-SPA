var wotScene = (function(){
    // Scene Boiler
    var scene = new THREE.Scene(); scene.name="scene";
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);// Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var renderer = new THREE.WebGLRenderer();
    var load_Json = new THREE.JSONLoader();
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
                camera.position.set(10,1,13.85);
                camera.rotation.set(0,0,0);
                scene.add(camera);

                // Material & Textures
                var mat_atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas.png')});
                var mat_concrete = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/concrete.jpg')});
                var mat_grass = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/grass.jpg')});
                var mat_sandstone = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/sandstone.jpg')});
                var mat_stones = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/stones.jpg')});
                var mat_water = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/water.jpg')});


                // Load Model Assets
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
                // @Fountain - Sandstone
                load_Json.load('./js/wot-scene/json/fountainSandstone.json', function(geo){
                    var obj_fountainSandstone = new THREE.Mesh(geo, mat_sandstone);
                    obj_fountainSandstone.name = 'fountainSandstone';
                    THREE.SceneUtils.attach(obj_fountainSandstone, scene, scene.getObjectByName('fountainStone'));
                    scene.add(obj_fountainSandstone);
                });
                // @Fountain - Water
                load_Json.load('./js/wot-scene/json/fountainWater.json', function(geo){
                    var obj_fountainWater = new THREE.Mesh(geo, mat_water);
                    obj_fountainWater.name = 'fountainWater';
                    scene.add(obj_fountainWater);
                });
                // @Fountain - Lights
                load_Json.load('./js/wot-scene/json/fountainLights.json', function(geo){
                    var obj_fountainLights = new THREE.Mesh(geo, mat_atlas);
                    obj_fountainLights.name = 'fountainLights';
                    scene.add(obj_fountainLights);
                });
                // @Fountain - Decor
                load_Json.load('./js/wot-scene/json/fountainDecor.json', function(geo){
                    var obj_fountainDecor = new THREE.Mesh(geo, mat_atlas);
                    obj_fountainDecor.name = 'fountainDecor';
                    scene.add(obj_fountainDecor);
                });
                // @Fountain - Sidewalk Ring
                load_Json.load('./js/wot-scene/json/sidewalkFountainSmallBorder.json', function(geo){
                    var obj_sidewalkFountainSmallBorder = new THREE.Mesh(geo, mat_concrete);
                    obj_sidewalkFountainSmallBorder.name = 'sidewalkFountainSmallBorder';
                    scene.add(obj_sidewalkFountainSmallBorder);
                });

                // Sidewalk - sidewalkTileSmallBevelCap
                load_Json.load('./js/wot-scene/json/sidewalkTileSmallBevelCap.json', function(geo){
                    var obj_sidewalkTileSmallBevelCap = new THREE.Mesh(geo, mat_concrete);
                    obj_sidewalkTileSmallBevelCap.name = "sidewalkTileSmallBevelCap";
                    scene.add(obj_sidewalkTileSmallBevelCap);
                });
                // Sidewalk - sidewalkTileSmall
                load_Json.load('./js/wot-scene/json/sidewalkTileSmall.json', function(geo){
                    var obj_sidewalkTileSmall = new THREE.Mesh(geo, mat_concrete);
                    obj_sidewalkTileSmall.name = 'sidewalkTileSmall';
                    scene.add(obj_sidewalkTileSmall);
                });

                // Eternal Flame
                load_Json.load('./js/wot-scene/json/eternalFlame.json', function(geo){
                    var obj_eternalFlame = new THREE.Mesh(geo, mat_atlas);
                    obj_eternalFlame.name = 'eternalFlame';
                    scene.add(obj_eternalFlame);
                });
                // @Eternal Flame - Sidewalk
                load_Json.load('./js/wot-scene/json/eternalFlameSidewalk.json', function(geo){
                    var obj_eternalFlameSidewalk = new THREE.Mesh(geo, mat_concrete);
                    obj_eternalFlameSidewalk.name = 'eternalFlameSidewalk';
                    scene.add(obj_eternalFlameSidewalk);
                });

                render();
            }
        );
    }
    function setParents(){
        console.log('Setting Parents');

        // Parenting
        // Fountain
        THREE.SceneUtils.attach(scene.getObjectByName('fountainSandstone'), scene, scene.getObjectByName('fountainStone'));
        THREE.SceneUtils.attach(scene.getObjectByName('fountainWater'), scene, scene.getObjectByName('fountainStone'));
        THREE.SceneUtils.attach(scene.getObjectByName('fountainLights'), scene, scene.getObjectByName('fountainStone'));
        THREE.SceneUtils.attach(scene.getObjectByName('fountainDecor'), scene, scene.getObjectByName('fountainStone'));
        THREE.SceneUtils.attach(scene.getObjectByName('sidewalkFountainSmallBorder'), scene, scene.getObjectByName('fountainStone'));
        // Eternal Flame
        THREE.SceneUtils.attach(scene.getObjectByName('eternalFlameSidewalk'), scene, scene.getObjectByName('eternalFlame'));
        positionProps()
    }
    function positionProps(){
        console.log('Positioning Props');

        scene.getObjectByName('sidewalkTileSmallBevelCap').position.x = 10.27;
        scene.getObjectByName('sidewalkTileSmall').position.x = 12.71;
        scene.getObjectByName('eternalFlame').position.x = 17.975;
    }
    function render(){
        try{
            // camera.rotation.y += 0.005;
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
        setParents: setParents,
        positionProps: positionProps
    }
}());