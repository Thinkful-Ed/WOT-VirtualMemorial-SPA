var wotScene = (function(){
    // Scene & Renderer
    var scene= new THREE.Scene(); scene.name="scene";
    var renderer = new THREE.WebGLRenderer({antialias:true});
    // Cameras
    var camera_Names = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);// Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var camera_Tour;
    var camera_Target;
    var controls;
    // Loaders & Controllers
    var clock = new THREE.Clock();
    var load_Objs = new THREE.ObjectLoader();
    var load_Tex = new THREE.TextureLoader();
    var load_Text = new THREE.FontLoader();
    var mixer;
    // Content Assets
    var materials;
    var anims = {};

    // Helpers
    var useHelpers = true;
    var mouseInput = true;
    var frameCount = 0;
    var yCount = 5;

    function init(){
        return new Promise(function(resolve, reject){
            console.log('Init & Loading Scene Assets');
            // Helpers
            if(useHelpers===true){
                var sceneAxis = new THREE.AxisHelper(5);
                scene.add(sceneAxis);
            }

            // Window & Renderer
            /*var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
            var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;
            renderer.setSize(renderWindowWidth, renderWindowHeight);
            document.getElementById('webgl-container').appendChild(renderer.domElement);*/
            initDomWindow();

            // Lighting
            var lgt_directional = new THREE.DirectionalLight(0xffffff, .85);
            var lgt_ambient = new THREE.AmbientLight(0xffffff, .65);
            scene.add(lgt_directional, lgt_ambient);

            // Camera
            camera_Names.name = 'camera_Names';
            camera_Names.position.set(0, 5, 10);
            camera_Names.rotation.set(-.2, 0, 0);
            camera_Target = camera_Names;
            scene.add(camera_Names);

            scene.fog = new THREE.Fog(0xd4e1f4, 10, 725);

            // Materials & Textures
            var atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas.png')});
            atlas.name = 'atlas';
            atlas.transparent = true;
            atlas.side = THREE.DoubleSide;
            // atlas.depthWrite = false;
            atlas.alphaTest = 0.5;
            var concrete = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/concrete.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(5, 5);
            })});
            concrete.name='concrete';
            concrete.color = {r:.5, g:.5, b:.5};
            var grass = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/grass.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(100, 100);
            })});
            grass.name = 'grass';
            var sandstone = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/sandstone.jpg')});
            sandstone.name = 'sandstone';
            var stones = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/stones.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(3, 3);
            })});
            stones.name = 'stones';
            var water = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/water.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(5, 5);
            })});
            water.name = 'water';
            var bush = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/bush.jpg', function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 4);
            })});
            var memorialNames = new THREE.MeshBasicMaterial({color: 0xffffff});
            materials = {
                atlas: atlas,
                concrete: concrete,
                grass: grass,
                sandstone: sandstone,
                stones: stones,
                water: water,
                bush: bush,
                memorialNames: memorialNames
            }; // Package materials up in an object

            // Helper Objects
            var trs_camPivot = new THREE.Object3D();
            trs_camPivot.name = 'camPivot';
            scene.add(trs_camPivot);

            // Load JSONs
            (function(){
                // Scene
                load_Objs.load("./js/wot-scene/json/wot-scene-minify.json", function(importScene){
                        console.log(importScene);
                        scene.add(importScene);
                        scene.animations = importScene.animations;
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
            }());
            render();
        });
    }
    function setMaterials(){
        console.log('Setting Materials');
        // Apply Atlas
        for(var i=0; i<scene.children[4].children.length; i++){
            scene.children[4].children[i].material = materials.atlas;
        }
        // Traverse Scene Mat Setup
        scene.traverse(function(obj){
            var objName = obj.name;

            if(objName.match(/Road/)){
                obj.material = materials.concrete;
            }
            if(objName.match(/sidewalk/)){
                obj.material = materials.concrete;
            }
        });
        // Apply Specific Textures
        scene.getObjectByName('fountainStone').material = materials.concrete;
        scene.getObjectByName('ground').material = materials.grass;
        scene.getObjectByName('fountainWater').material = materials.water;
        scene.getObjectByName('fountainStone').material = materials.stones;
        scene.getObjectByName('fountainSandstone').material = materials.sandstone;
        scene.getObjectByName('reflectingPoolWater').material = materials.water;
        scene.getObjectByName('reflectingPoolStone').material = materials.stones;
        scene.getObjectByName('reflectingPoolSandstone').material = materials.sandstone;
        scene.getObjectByName('bush').material = materials.bush;
        scene.getObjectByName('bush.001').material = materials.bush;
    }
    function setParents(){
        console.log('Setting Parents');
        // Helpers
        if(useHelpers===true){
            THREE.SceneUtils.attach(scene.getObjectByName('camera_Names'), scene, scene.getObjectByName('camPivot'));
        }
    }
    function playAnimation(){
        camera_Tour = scene.getObjectByName('camera_Tour');

        // Anim Setup
        mixer = new THREE.AnimationMixer(camera_Tour);
        anims.tour = mixer.clipAction(scene.animations[0]);
        // anims.tour = mixer.clipAction(scene.children[4].animations[0]);
        anims.tour.setLoop(THREE.LoopRepeat);
        anims.tour.setEffectiveWeight(1);
        anims.tour.enabled = true;

        // Camera Setup & Play
        camera_Target = camera_Tour;
        anims.tour.play();

        console.log(scene);
    }
    function pauseAnimation(){}
    function positionProps(){
        console.log('Positioning Props');
        // Reposition
        scene.getObjectByName('ground').rotation.z = 0;
        scene.getObjectByName('Road_TriCap').rotation.z = 0;
        scene.getObjectByName('Road_HCap_R').rotation.z = 0;
        scene.getObjectByName('Road_HCap_L').rotation.z = 0;
        scene.getObjectByName('Road_T').rotation.z = 0;
        scene.getObjectByName('Road_T.001').rotation.z = 0;
        scene.getObjectByName('sidewalkTileSmallBevelCap').rotation.z = 0;
        scene.getObjectByName('sidewalkFront').rotation.z = 0;
        scene.getObjectByName('sidewalkTileLargeBevel.001').rotation.z = 0;
        scene.getObjectByName('sidewalkTileLargeBevel.002').rotation.z = 0;
        scene.getObjectByName('sidewalkReflectingPoolNorth').rotation.z = 0;
        scene.getObjectByName('sidewalkReflectingPoolSouth').rotation.z = 0;
        scene.getObjectByName('sidewalkSouthSteps').rotation.z = 0;
        scene.getObjectByName('Road_TriSplit').rotation.z = 0;
        scene.getObjectByName('Road_TriSplit.001').rotation.z = 0;
        scene.getObjectByName('towerDecor').rotation.z = 0;
        scene.getObjectByName('fence').rotation.z = 0;
        scene.getObjectByName('bush').rotation.z = 0;
        scene.getObjectByName('bush.001').rotation.z = 0;

        if(useHelpers===true){
            controls = new THREE.FlyControls(camera_Target,  document.getElementById('dynamic-container'));
            controls.movementSpeed = .2;
            controls.rollSpeed = 0.01;
            controls.autoForward = false;
            controls.dragToLook = true;
        }
        createName('Bill Wheaton');
    }
    function viewOnMemorial(json){
        //camera_Target = camera_Names;
        json.forEach(function(item){
            console.log(item);
            // createName(item);
        })
    }
    function initDomWindow(){
        var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
        var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;
        renderer.setSize(renderWindowWidth, renderWindowHeight);
        document.getElementById('webgl-container').appendChild(renderer.domElement);

        render();
    }
    function createName(json){
        load_Text.load('./js/wot-scene/json/Arial_Regular.json', function(font){
            var geo = new THREE.TextGeometry(json.Name,
                {
                    font: font,
                    size: .1,
                    height: .01,
                    curveSegments: 12,
                    bevelEnabled: false,
                    bevelThickness: 1,
                    bevelSize: 1,
                    bevelSegments: 2
                });

            var textMesh = new THREE.Mesh(geo, materials.memorialNames);
            textMesh.name = json.uui;

            //textMesh.position.set(0,5,0);
            textMesh.position.y = yCount +1;
            scene.add(textMesh);
        });
    }
    function render(){
        var animCam = scene.getObjectByName('camPivot');
        try{
            if(useHelpers===true){
                //console.log(frameCount+=1);
                if(mouseInput === true){
                    controls.update( 1 );
                }
                else{
                    animCam.rotation.y += 0.005;
                }
            }
        }
        catch (err){
            console.log(err);
        }
        finally {
            renderer.render(scene, camera_Target);
            requestAnimationFrame(render);
        }
    }

    // Expose scene obj for debugging purposes.
    return{
        scene: scene,
        camera_Target: camera_Target,
        renderer: renderer,
        init: init,
        setMaterials: setMaterials,
        setParents: setParents,
        positionProps: positionProps,
        playAnimation: playAnimation,
        viewOnMemorial: viewOnMemorial,
        initDomWindow: initDomWindow
    }
}());