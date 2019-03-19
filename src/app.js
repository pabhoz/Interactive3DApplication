/**
 * GLOBAL VARS
 */
lastTime = Date.now();
cameras = {
    default: null,
    current: null
};
canvas = {
    element: null,
    container: null
}
labels = {}
cameraControl = null;
scene = null;
renderer = null

players = {
    p1: null,
    p2: null,
    p3: null,
    p4: null
}

/**
 * Function to start program running a
 * WebGL Application trouhg ThreeJS
 */
let webGLStart = () => {
    initScene();
    window.onresize = onWindowResize;
    lastTime = Date.now();
    animateScene();
};

/**
 * Here we can setup all our scene noobsters
 */
function initScene() {
    //Selecting DOM Elements, the canvas and the parent element.
    canvas.container = document.querySelector("#app");
    canvas.element = canvas.container.querySelector("#appCanvas");

    /**
     * SETTING UP CORE THREEJS APP ELEMENTS (Scene, Cameras, Renderer)
     * */
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ canvas: canvas.element });
    renderer.setSize(canvas.container.clientWidth, canvas.container.clientHeight);
    renderer.setClearColor(0x20273a, 1);

    canvas.container.appendChild(renderer.domElement);

    //positioning cameras
    cameras.default = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 0.1, 1000);
    cameras.default.position.set(0, 0, 30);
    cameras.default.lookAt(new THREE.Vector3(0, 0, 0));
    //Setting up current default camera as current camera
    cameras.current = cameras.default;
    //Camera control Plugin
    cameraControl = new THREE.OrbitControls(cameras.current, renderer.domElement);

    lAmbiente = new THREE.AmbientLight(0xffffff);
    scene.add(lAmbiente);

    //FPS monitor
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

    //Init player with controls
    players.p1 = new Player("P1",null,new Control(),{label: true});
    players.p1.play(scene);

    players.p2 = new Player("P2",null,new Control("i","l","k","j"),{label: true});
    players.p2.play(scene);

    players.p3 = new Player("P3",null,new Control("t","h","g","f"),{label: true});
    players.p3.play(scene);

    initObjects();
}

/**
 * Function to add all objects, lights (except for the ambienlight) and stuff to scene
 */
function initObjects(){
    mySound3D = new Sound(["./assets/songs/1.mp3"],10,scene,{
        debug:true,
        position: {x:0,y:10,z:0}
    });
}

/**
 * Function to render application over
 * and over.
 */
function animateScene() {
    requestAnimationFrame(animateScene);
    renderer.render(scene, cameras.current);
    updateScene();
}

/**
 * Function to evaluate logic over and
 * over again.
 */
function updateScene() {
    lastTime = Date.now();

    //Updating camera view by control inputs
    cameraControl.update();
    //Updating FPS monitor
    stats.update();
    //Sound Update
    mySound3D.update(players.p1.element);

    for (const label of Object.keys(labels)) {
        labels[label].lookAt(cameras.current.position);
        if(label == "p1"){
            labels[label].position.copy(players.p1.element.position);
        }
        if(label == "p2"){
            labels[label].position.copy(players.p2.element.position);
        }
    }

}

function onWindowResize() {
    cameras.current.aspect = window.innerWidth / window.innerHeight;
    cameras.current.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}