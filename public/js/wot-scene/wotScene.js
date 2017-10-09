var wotScene = (function(){
    // Scene & Renderer
    var scene= new THREE.Scene(); scene.name="scene";
    var renderer = new THREE.WebGLRenderer({antialias:true});
    // Cameras
    var camAspectRatio = document.getElementById('dynamic-container').offsetWidth / document.getElementById('dynamic-container').offsetHeight;
    var camera_Names = new THREE.PerspectiveCamera(35, camAspectRatio, 0.01, 1000);// Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var camera_Tour;
    var camera_Target;
    var camtrs = {
        pos: {x: -20, y: 1.5, z: 0},
        rot: {x: 0,y: -1.5708, z: 0}
    };
    var controls;
    // Loaders & Controllers
    var load_Objs = new THREE.ObjectLoader();
    var load_Tex = new THREE.TextureLoader();
    var load_Text = new THREE.FontLoader();
    var font;
    var mixer;
    // Content Assets
    var materials;

    // Animation Assets
    var clock = new THREE.Clock();
    var frame = 0;
    var timeBuffer = 1;
    var animState = {
        pause: false
    };
    var tourTimes = {
        entrance: 0,
        steps: 15,
        pool: 25,
        flame: 63.5,
        fountain: 73.5,
        flyover: 115.5
    };
    var animClips = {};

    // Helpers
    var useHelpers = false;
    var mouseInput = false;
    var frameCount = 0;
    var yCount = 5;

    // Init
    function initWebgl(){
        console.log('Init & Loading Scene Assets');

        // Helpers
        if(useHelpers===true){
            var sceneAxis = new THREE.AxisHelper(5);
            scene.add(sceneAxis);
        }

        // Lighting
        var lgt_directional = new THREE.DirectionalLight(0xffffff, .85);
        var lgt_ambient = new THREE.AmbientLight(0xffffff, .65);
        scene.add(lgt_directional, lgt_ambient);

        // Camera
        camera_Names.name = 'camera_Names';
        camera_Names.position.set(camtrs.pos.x, camtrs.pos.y, camtrs.pos.z);
        camera_Names.rotation.set(camtrs.rot.x, camtrs.rot.y, camtrs.rot.z);
        camera_Target = camera_Names;
        scene.add(camera_Names);

        scene.fog = new THREE.Fog(0xd4e1f4, 10, 725);

        // Helper Objects
        var trs_camPivot = new THREE.Object3D();
        trs_camPivot.name = 'camPivot';
        scene.add(trs_camPivot);
    }
    function loadJson(){
        let loadStatus = 0;
        return new Promise(function(resolve, reject){
            try{
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
                            console.log(loadStatus);
                            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                            loadStatus = xhr.loaded / xhr.total * 100;
                        },
                        // Function called when download errors
                        function ( xhr ) {
                            console.error( 'An error happened' );
                        }
                    );
                }());
                /*setTimeout(function(){
                    resolve('Loading JSON Success');
                }, 2500);*/
                if(loadStatus === 100){
                    resolve('Loading JSON Success');
                }
                else{
                    reject('Error Loading JSON');
                }
            }
            catch(error){
                reject('Error Loading JSON');
            }
        });
    }
    function loadTextureAndMaterials(){
        return new Promise(function(resolve, reject){
            try{
                // Materials & Textures
                var atlas = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/atlas-1k.png')});
                var concrete = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/concrete.jpg', function(texture){
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(5, 5);
                })});
                var grass = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/grass.jpg', function(texture){
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(100, 100);
                })});
                var sandstone = new THREE.MeshLambertMaterial({map: load_Tex.load('./js/wot-scene/textures/sandstone.jpg')});
                var stones = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/stones.jpg', function(texture){
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(3, 3);
                })});
                var water = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/water.jpg', function(texture){
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(5, 5);
                })});
                var bush = new THREE.MeshPhongMaterial({map: load_Tex.load('./js/wot-scene/textures/bush.jpg', function(texture){
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(4, 4);
                })});
                var nameGroup = new THREE.MeshBasicMaterial({color: 0x808080});
                var nameFocus = new THREE.MeshBasicMaterial({color: 0xffffff});
                materials = {
                    atlas: atlas,
                    concrete: concrete,
                    grass: grass,
                    sandstone: sandstone,
                    stones: stones,
                    water: water,
                    bush: bush,
                    nameGroup: nameGroup,
                    nameFocus: nameFocus
                }; // Package materials up in an object
                resolve('Success Loading Textures & Materials');
            }
            catch(error){
                reject('Error Loading Textures & Materials');
            }
        });
    }
    function webglSceneSetup(promResponse){
        console.log('Promises Fullfilled - Starting Scene Setup');
        console.log(promResponse);
        // Materials
        (function(){
            console.log('Applying Prop Materials');
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
            // Modify Materials
            materials.atlas.name = 'atlas';
            materials.atlas.transparent = true;
            materials.atlas.side = THREE.DoubleSide;
            materials.atlas.alphaTest = 0.5;
            materials.concrete.name='concrete';
            materials.concrete.color = {r:.5, g:.5, b:.5};
            materials.grass.name = 'grass';
            materials.sandstone.name = 'sandstone';
            materials.stones.name = 'stones';
            materials.water.name = 'water';

            // Apply Specific Textures
            scene.getObjectByName('fountainStone').material = materials.concrete;
            scene.getObjectByName('ground').material = materials.grass;
            scene.getObjectByName('fountainWater').material = materials.water;
            scene.getObjectByName('fountainStone').material = materials.stones;
            scene.getObjectByName('fountainSandstone').material = materials.sandstone;
            scene.getObjectByName('reflectingPoolWater').material = materials.water;
            scene.getObjectByName('reflectingPoolStone').material = materials.stones;
            scene.getObjectByName('reflectingPoolSandstone').material = materials.sandstone;
        }());
        // Positioning
        (function(){
            console.log('Applying Prop trsPosition');
            // Reposition
            scene.getObjectByName('ground').rotation.z = 0;
            scene.getObjectByName('Road_TriCap').rotation.z = 0;
            scene.getObjectByName('Road_HCap_R').rotation.z = 0;
            scene.getObjectByName('Road_HCap_L').rotation.z = 0;
            scene.getObjectByName('Road_T').rotation.z = 0;
            scene.getObjectByName('Road_T.001').rotation.z = 0;
            scene.getObjectByName('sidewalkTileSmallBevelCap').rotation.z = 0;
            scene.getObjectByName('sidewalkFront').rotation.z = 0;
            scene.getObjectByName('sidewalkTileLargeBevel.000').rotation.z = 0;
            scene.getObjectByName('sidewalkTileLargeBevel.001').rotation.z = 0;
            scene.getObjectByName('sidewalkReflectingPoolNorth').rotation.z = 0;
            scene.getObjectByName('sidewalkReflectingPoolSouth').rotation.z = 0;
            scene.getObjectByName('sidewalkSouthSteps').rotation.z = 0;
            scene.getObjectByName('Road_TriSplit').rotation.z = 0;
            scene.getObjectByName('Road_TriSplit.001').rotation.z = 0;
            scene.getObjectByName('towerDecor').rotation.z = 0;
            scene.getObjectByName('fence').rotation.z = 0;

            if(useHelpers===true){
                controls = new THREE.FlyControls(camera_Target,  document.getElementById('dynamic-container'));
                controls.movementSpeed = .2;
                controls.rollSpeed = 0.01;
                controls.autoForward = false;
                controls.dragToLook = true;
            }
        }());
        // Parenting & Merging
        (function(){
            console.log('Applying Parenting & Merging');
            if(useHelpers===true){
                THREE.SceneUtils.attach(scene.getObjectByName('camera_Names'), scene, scene.getObjectByName('camPivot'));
            }
        }());
        // Misc
        (function(){
            scene.getObjectByName('camera_Tour').aspect = camAspectRatio;
        }());

        initTourAnimation();
    }
    function initTourAnimation(){
        console.log('Playing');
        camera_Tour = scene.getObjectByName('camera_Tour');

        // Anim Setup
        mixer = new THREE.AnimationMixer(camera_Tour);
        animClips.tour = mixer.clipAction(scene.animations[0]);
        animClips.tour.setLoop(THREE.LoopRepeat);
        animClips.tour.setEffectiveWeight(1);
        animClips.tour.enabled = true;

        // Camera Setup & Play
        camera_Target = camera_Tour;

        $('#menu-tour').removeClass('no-click');
    }
    // Tour Crtls
    function toggleCamera(){
        var currentCam = camera_Target.name;
        if(currentCam === 'camera_Tour'){
            animClips.tour.timeScale = 0;
            camera_Target = camera_Names;
            enablePlayCrtls(true);
        }
        else{
            camera_Target = camera_Tour;
            animClips.tour.timeScale = 1;
            enablePlayCrtls(false);
            animClips.tour.play();
        }
    }
    function animPlayPause(){
        if(animState.pause === false){
            stopAnim();
        }
        else{
            playAnim();
        }
    }
    function playAnim() {
        animState.pause = false;
        animClips.tour.timeScale = 1;
        animClips.tour.play();
    }
    function stopAnim(){
        animState.pause = true;
        animClips.tour.timeScale = 0;
    }
    function enablePlayCrtls(booVal){
        if(booVal===true){
            $("#webgl-controls-backwards").addClass('no-click');
            $("#webgl-controls-play").addClass('no-click');
            $("#webgl-controls-forward").addClass('no-click');
        }
        else{
            $("#webgl-controls-backwards").removeClass('no-click');
            $("#webgl-controls-play").removeClass('no-click');
            $("#webgl-controls-forward").removeClass('no-click');
        }
    }
    function fastForwardAnimation(){
        if(frame >= tourTimes.entrance && frame <= tourTimes.steps){
            console.log(`FF > Steps | Current Time: ${frame}, Set Time: ${tourTimes.steps}`);
            animClips.tour.time = tourTimes.steps;
        }
        else if(frame >= tourTimes.steps && frame <= tourTimes.pool){
            console.log(`FF > Pool | Current Time: ${frame}, Set Time: ${tourTimes.pool}`);
            animClips.tour.time = tourTimes.pool;
        }
        else if(frame >= tourTimes.pool && frame <= tourTimes.flame){
            console.log(`FF > Flame | Current Time: ${frame}, Set Time: ${tourTimes.flame}`);
            animClips.tour.time = tourTimes.flame;
        }
        else if(frame >= tourTimes.flame && frame <= tourTimes.fountain){
            console.log(`FF > Fountain | Current Time: ${frame}, Set Time: ${tourTimes.fountain}`);
            animClips.tour.time = tourTimes.fountain
        }
        else if(frame >= tourTimes.fountain && frame <= tourTimes.flyover){
            console.log(`FF > Flyover | Current Time: ${frame}, Set Time: ${tourTimes.flyover}`);
            animClips.tour.time = tourTimes.flyover
        }
        else{
            console.log(`FF > Entrance | Current Time: ${frame}, Set Time: ${tourTimes.entrance}`);
            animClips.tour.time = tourTimes.entrance
        }
    }
    function rewindAnimation(){
        if(frame >= tourTimes.entrance + timeBuffer && frame <= tourTimes.steps + timeBuffer){
            console.log(`RR > Entrance | Current Time: ${frame}, Set Time: ${tourTimes.entrance}`);
            animClips.tour.time = tourTimes.entrance;
        }
        else if(frame >= tourTimes.steps + timeBuffer && frame <= tourTimes.pool + timeBuffer){
            console.log(`RR > Steps | Current Time: ${frame}, Set Time: ${tourTimes.steps}`);
            animClips.tour.time = tourTimes.steps;
        }
        else if(frame >= tourTimes.pool + timeBuffer && frame <= tourTimes.flame + timeBuffer){
            console.log(`RR > Pool | Current Time: ${frame}, Set Time: ${tourTimes.pool}`);
            animClips.tour.time = tourTimes.pool;
        }
        else if(frame >= tourTimes.flame + timeBuffer && frame <= tourTimes.fountain + timeBuffer){
            console.log(`RR > Flame | Current Time: ${frame}, Set Time: ${tourTimes.flame}`);
            animClips.tour.time = tourTimes.flame;
        }
        else if(frame >= tourTimes.fountain + timeBuffer && frame <= tourTimes.flyover + timeBuffer){
            console.log(`RR > Fountain | Current Time: ${frame}, Set Time: ${tourTimes.fountain}`);
            animClips.tour.time = tourTimes.fountain;
        }
        else if(frame >= tourTimes.flyover){
            console.log(`RR > Flyover | Current Time: ${frame}, Set Time: ${tourTimes.flyover}`);
            animClips.tour.time = tourTimes.flyover
        }
        else{
            animClips.tour.time =  tourTimes.flyover;
        }
    }
    // Name Display
    function viewOnMemorial(json, panel, position, vetName){
        var panelPosition = position;
        var scenePanel = scene.getObjectByName(`tar_panel.${panel}`);
        // Positioning
        var horOffset = -.435; //.525
        var verOffset = .215;
        var depOffset = .15;

        enablePlayCrtls(false);

        // Position camera to vet panel
        camera_Names.rotation.set(0, 0, 0);
        camera_Names.position.set(scenePanel.position.x, scenePanel.position.y, scenePanel.position.z);
        camera_Names.rotation.y = scenePanel.rotation.z;
        camera_Names.translateZ(1.5);
        camera_Target = camera_Names;

        // Group to store names
        try{
            scene.remove(scene.getObjectByName('vetNameGroup'))
        }
        finally{
            var vetNameGroup = new THREE.Group();
            vetNameGroup.name = 'vetNameGroup';
            vetNameGroup.visible = false;
            scene.add(vetNameGroup);
        }
        createName(json, panelPosition, vetNameGroup, vetName);

        // Position & orient to panel
        vetNameGroup.rotation.set(0, 0, 0);
        vetNameGroup.position.set(scenePanel.position.x, scenePanel.position.y, scenePanel.position.z);
        vetNameGroup.rotation.y = scenePanel.rotation.z;
        // Name grp local transformations
        vetNameGroup.translateX(horOffset);
        vetNameGroup.translateY(verOffset);
        vetNameGroup.translateZ(depOffset);
        vetNameGroup.visible = true;

        htmlTemplates.loader();
    }
    function createName(json, position, nameGrp, vetName){
        console.log(position, vetName);

        load_Text.load('./js/wot-scene/json/Arial_Regular.json', function(font){
            // Loop counters
            let count = 1;
            let trsPos = 0;
            let trsRow = 0;
            let rowMax = 4;
            // Text placement
            let fontSize = .0125;
            let offsetPos = .235;
            let offsetRow = -.0225;

            json.forEach(function(jsonObj){
                let textMesh;
                let textMeshBox;
                var geo = new THREE.TextGeometry(jsonObj.Name,
                    {
                        font: font,
                        size: fontSize,
                        height: .001,
                        curveSegments: 1,
                        bevelEnabled: false,
                        bevelThickness: 1,
                        bevelSize: 1,
                        bevelSegments: 2
                    });

                textMesh = new THREE.Mesh(geo, materials.nameGroup);
                /*textMeshBox = new THREE.Box3().setFromObject(textMesh);
                console.log(textMeshBox.getSize());*/
                if(jsonObj.Name === vetName){
                    textMesh.material = materials.nameFocus;
                }
                textMesh.name = json[count].Name;
                nameGrp.add(textMesh);

                // Name Spread
                if(count <= rowMax){
                    // Increments
                    count += 1;

                    // Positioning
                    textMesh.position.x = trsPos;
                    textMesh.position.y = trsRow;

                    trsPos += offsetPos;
                }
                else{
                    // Increments
                    count = 1;
                    trsPos = 0;
                    trsRow += offsetRow;

                    // Positioning
                    textMesh.position.x = trsPos;
                    textMesh.position.y = trsRow;

                    count += 1;
                    trsPos += offsetPos;
                }
            });
        });
    }
    // Renderer
    function initDomWindow(rendererObj){
        var renderWindowWidth = document.getElementById('dynamic-container').offsetWidth;
        var renderWindowHeight = document.getElementById('dynamic-container').offsetHeight;
        rendererObj.setSize(renderWindowWidth, renderWindowHeight);
        document.getElementById('webgl-container').appendChild(rendererObj.domElement);

        render();
    }
    function render(){
        var animCam = scene.getObjectByName('camPivot');
        try{
            mixer.update(clock.getDelta());
            frame = animClips.tour.time;

            if(useHelpers===true){
                if(mouseInput === true){
                    controls.update( 1 );
                }
                else{
                    animCam.rotation.y += 0.005;
                }
            }
        }
        catch (err){
            //console.log(err);
        }
        finally {
            renderer.render(scene, camera_Target);
            if(state.requestNextFrame === true){
                requestAnimationFrame(render);
            }
        }
    }

    // Expose scene obj for debugging purposes.
    return{
        scene: scene,
        renderer: renderer,
        initWebgl: initWebgl,
        loadJson: loadJson,
        loadTextureAndMaterials: loadTextureAndMaterials,
        webglSceneSetup: webglSceneSetup,
        initTourAnimation: initTourAnimation,
        playAnim: playAnim,
        stopAnim: stopAnim,
        toggleCamera: toggleCamera,
        animPlayPause: animPlayPause,
        fastForwardAnimation: fastForwardAnimation,
        rewindAnimation: rewindAnimation,
        viewOnMemorial: viewOnMemorial,
        initDomWindow: initDomWindow
    }
}());