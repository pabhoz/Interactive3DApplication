class Player{

    constructor(name,element,control){
        this.name = name;
        this.element = element;
        this.control = control;
    }

    set element(mesh){
        if(mesh instanceof THREE.Mesh){
            this._element = mesh;
        }else{
            let geometry = new THREE.BoxGeometry( 1, 1, 1 );
            let material = new THREE.MeshBasicMaterial( {color: 0x0000ee, wireframe:true} );
            this._element = new THREE.Mesh( geometry, material );
        }
    }

    get element(){
        return this._element;
    }

    play(scene){
        scene.add(this.element);
    }
}