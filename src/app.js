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
collidableList = [];

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
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    canvas.container.appendChild(renderer.domElement);

    //positioning cameras
    cameras.default = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 0.1, 10000);
    cameras.default.position.set(1600,1600,-1600);
    cameras.default.lookAt(new THREE.Vector3(0, 0, 0));

    //CAMERAS
    var tracking = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 1, 10000);
	tracking.position.set(1600,1600,-1600);
	tracking.lookAt(new THREE.Vector3(0,0,0));

	var fixed = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 1, 10000);
	fixed.position.set(-600,300,-600);
	fixed.lookAt(new THREE.Vector3(0,0,0));

	var tpersona = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 1, 10000);
	tpersona.position.set(1600,1600,-1600);
	tpersona.lookAt(new THREE.Vector3(0,0,0));

	var observer = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 1, 10000);
	observer.position.set(1600,1600,-1600);
	observer.lookAt(new THREE.Vector3(0,0,0));

	cameras.tracking = tracking;
	cameras.fixed = fixed;
	cameras.tpersona = tpersona;
    cameras.observer = observer;
    //Setting up current default camera as current camera
    cameras.current = cameras.default;
    
    //Camera control Plugin
    cameraControl = new THREE.OrbitControls(cameras.current, renderer.domElement);

    lAmbiente = new THREE.AmbientLight(0x3d3c3c);
    scene.add(lAmbiente);

    //Luz Spotlight
	var spotLight = new THREE.SpotLight(0xff69b4,3.0, 1500.0, Math.PI/4,0.5,2.2);
	spotLight.position.set( 0, 600, 0 );
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 1;
	scene.add(spotLight);
    scene.add(new THREE.PointLightHelper(spotLight, 1));

    //FPS monitor
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

    //Init player with controls
    players.p1 = new Player("P1",null,new Control(),{label: false});
    players.p1.play(scene);
    spotLight.target = players.p1.element;

    players.p2 = new Player("P2",null,new Control("i","l","k","j"),{label: false});
    players.p2.play(scene);

    players.p3 = new Player("P3",null,new Control("t","h","g","f"),{label: false});
    players.p3.play(scene);

    initObjects();
}

/**
 * Function to add all objects and stuff to scene
 */
function initObjects(){
    sound1 = new Sound(["./assets/songs/1.mp3"],10,scene,{
        debug:true,
        position: {x:500,y:0,z:500}
    });

    sound2 = new Sound(["./assets/songs/2.mp3"],10,scene,{
        debug:true,
        position: {x:-500,y:0,z:-500}
    });
	
	//Suelo
	var plano = new THREE.Mesh(
		new THREE.CubeGeometry(1500,1,1500),
		new THREE.MeshPhongMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
    );
	plano.material.map.repeat.set(10,10);
	plano.material.map.wrapS = plano.material.map.wrapT = THREE.MirroredRepeatWrapping;
	plano.receiveShadow = true;
	plano.position.set(0,-1,0);
    scene.add(plano);
    
    var cuarto1 = new THREE.Mesh(
        new THREE.BoxGeometry(500,250,50),
        new THREE.MeshLambertMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
    );
    cuarto1.position.set( 750 - 250, 125 ,750 - 25);
    var p2C1 = new THREE.Mesh(
        new THREE.BoxGeometry(50,250,500),
        new THREE.MeshLambertMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
    );
    p2C1.position.set( 225, 0 ,-250);
    cuarto1.receiveShadow = true;
    p2C1.receiveShadow = true;
    cuarto1.add(p2C1);
    scene.add(cuarto1);

    //cuarto 2
    var cuarto2 = new THREE.Mesh(
        new THREE.BoxGeometry(500,250,50),
        new THREE.MeshLambertMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
    );
    cuarto2.position.set( -750 + 250, 125 ,-750 + 25);
    var p2C2 = new THREE.Mesh(
        new THREE.BoxGeometry(50,250,500),
        new THREE.MeshLambertMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
    );
    p2C2.position.set( 225, 0 ,-250);
    cuarto2.add(p2C2);
    cuarto2.receiveShadow = true;
    p2C2.receiveShadow = true;
    cuarto2.rotation.y = -Math.PI;
    scene.add(cuarto2);

    colisionable = new THREE.Mesh(
        new THREE.BoxGeometry(100,100,50),
        new THREE.MeshBasicMaterial( {color:0x6a6a6a})
    );
    colisionable.position.set(-200,50,0);
    scene.add(colisionable);

    var powerup = new THREE.Mesh(
        new THREE.BoxGeometry(200,50,200),
        new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true})
    );
    powerup.position.set(0,20,-300);
    powerup.name = "thanos";
    scene.add(powerup);
    powerup2 = new THREE.Mesh(
        new THREE.BoxGeometry(200,50,200),
        new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true})
    );
    powerup2.position.set(-180,70,-300);
    powerup2.name="plataforma";
    powerup2.isInUse = false;
    scene.add(powerup2);

    collidableList.push(colisionable);
    collidableList.push(cuarto1);
    collidableList.push(cuarto2);
    collidableList.push(plano);
    collidableList.push(powerup);
    collidableList.push(powerup2);
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
    sound1.update(players.p1.element);
    sound2.update(players.p1.element);

    //Players controls
    for (const player of Object.keys(players)) {
        if( players[player] != null ){
            players[player].updateControls();
            players[player].collidableBox.update(players[player].control);
        }
    }


    for (const label of Object.keys(labels)) {
        labels[label].lookAt(cameras.current.position);
        if(label == "p1"){
            labels[label].position.copy(players.p1.element.position);
        }
        if(label == "p2"){
            labels[label].position.copy(players.p2.element.position);
        }
    }

    //cameras
    cameras.tpersona.position.copy(players.p1.element.position);
        cameras.tpersona.position.y += 300;
        cameras.tpersona.position.x += 300;
        cameras.tpersona.position.z -= 300;

    if(powerup2.position.y > 70 && !powerup2.isInUse){
            powerup2.position.y -= 1;
    }

}

function onWindowResize() {
    cameras.current.aspect = window.innerWidth / window.innerHeight;
    cameras.current.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}