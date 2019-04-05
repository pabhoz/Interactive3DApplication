class Player {

    constructor(name,element,control,ap = {}){
        this.name = name;
        this.control = control;
        this.element = element;
        this.label = this.getLabel();

        this.vy = 0;
        this.vx = 20;
        this.m = 5;

        if("label" in ap){
            if(ap.label){
                this.showLabel();
            }
        }
    }

    set element(mesh){
        if(mesh instanceof THREE.Mesh){
            this._element = mesh;
        }else{
            let geometry = new THREE.SphereGeometry(50,10,10)
            let material = new THREE.MeshPhongMaterial( {color: Utilities.randomHexColor(), wireframe:false} );
            this._element = new THREE.Mesh( geometry, material );
            var helper = new THREE.BoundingBoxHelper(this._element, 0xff0000);
            helper.update();
            this._element.add(helper);
            this._element.position.y = 50.1;
            this._element.castShadow = true;
            this._element.receiveShadow = true;
        }
        this.control.element = this._element;
    }

    get element(){
        return this._element;
    }

    updateControls(){
        this.control.update(this.vx,this.vy,this.m,60);
    }

    getLabel(){
        return Utilities.label(
            this.element.position,
            Utilities.textTure(this.name, 128, "Bold", "10px", "Arial", "0,0,0,1", 64, 50)
        )
    }

    showLabel(){
        this.element.add(this.label);
    }

    play(scene){
        this.collidableBox = new CollidableBox(this._element,50);
       // this.element.position.y = ;
        scene.add(this.element);
    }
}