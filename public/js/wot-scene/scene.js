var wotScene = (function(){
    // 'use strict';
    // Scene Boiler
    var scene = new THREE.Scene();
    // Checks for WebGL Content. If not there fallback to canvas render for older browsers.
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.01, 1000);
    var renderer = new THREE.WebGLRenderer();

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

        // Cube Setup
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshLambertMaterial({color: 0xFF0000}
            ));
        box.name = "box";
        scene.add(box);

        var loader = new THREE.JSONLoader();
        var wotMat = new THREE.MeshLambertMaterial({color: 0xd3d3d3});
        loader.load('./json/wot-geometry-faceMaterialOn.json', function(geometry){
            var wotMesh  = new THREE.Mesh(geometry, wotMat);
            wotMesh.name = "wotMesh";
            scene.add(wotMesh);
        });
        render();
    }

    function render(){
        try{
            var animMesh = wotScene.scene.getObjectByName("wotMesh");
            animMesh.rotation.y += 0.001;
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