var fg = 0.4;

class CollidableBox {
    constructor(mesh, boundingRadius) {
        this.mesh = mesh;
        this.collidableRadius = boundingRadius;
        // this.initBoundingMesh(this.mesh);
    }

    initBoundingMesh(mesh) {
        console.log(mesh);
        this.collidableRadius = mesh.geometry.boundingSphere.radius;
    }

    collide(normal, callback, verticalColliding = false) {
        let collidableRay = new THREE.Raycaster();
        collidableRay.ray.direction.set(normal.x, normal.y, normal.z);

        let origin = this.mesh.position.clone();
        collidableRay.ray.origin.copy(origin);

        let intersections = collidableRay.intersectObjects(collidableList);

        if(verticalColliding){
            if (intersections.length > 0) {
                callback(intersections);
            }
        }else{
            if (intersections.length > 0) {
                let distance = intersections[0].distance;
                if (distance <= this.collidableRadius - 10) {
                    callback();
                }
            }
        }
        
    }
    collideLeft(controls) {
        let callback = () => {
            this.mesh.position.z -= controls.vx;
        }
        this.collide({ x: 0, y: 0, z: 1 }, callback);
    }

    collideRight(controls) {
        let callback = () => {
            this.mesh.position.z += controls.vx;
        }
        this.collide({ x: 0, y: 0, z: -1 }, callback);
    }

    collideBottom(controls) {
        let callback = (intersections) => {
            let distance = intersections[0].distance;
            if (distance > this.collidableRadius + 1) {
                //Estoy en el aire!!
                //console.log(distance);
                this.mesh.position.y -= (controls.m * fg) / Math.max(0.2,(distance / 500));
            }
            if (distance <= this.collidableRadius + 5) {
                //console.log(intersections[0]);
                this.mesh.position.y += 1;
                switch (intersections[0].object.name) {
                    case "plataforma":
                            powerup2.isInUse = true;
                            powerup2.position.y += 1;
                        break;
                        case "thanos":
                       this.mesh.material.color = new THREE.Color("0xffffff")
                    break;
                }
            }else{
                powerup2.isInUse = false;
            }

        }
        this.collide({ x: 0, y: -1, z: 0 }, callback, true);
    }

    update(controls) {
        this.collideLeft(controls);
        this.collideRight(controls);
        this.collideBottom(controls);
    }
}