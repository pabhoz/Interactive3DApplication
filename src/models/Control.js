class Control {

    constructor(up, right, down, left) {
        this.initControls();
        
        this.up.key = up || "w";
        this.down.key = down || "s";
        this.left.key = left || "a";
        this.right.key = right || "d";

        
        this.initListeners();
    }

    initControls() {
        this.up = {key:"",isPressed: false};
        this.right = {key:"",isPressed: false};
        this.down = {key:"",isPressed: false};
        this.left = {key:"",isPressed: false};
    }

    initListeners() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case this.up.key:
                   this.pressUp();
                    break;
                case this.right.key:
                   this.pressRight();
                    break;
                case this.down.key:
                   this.pressDown();
                    break;
                case this.left.key:
                   this.pressLeft();
                    break;
            }
        }

        document.onkeyup = (e) => {
            switch (e.key) {
                case this.up.key:
                   this.releaseUp();
                    break;
                case this.right.key:
                   this.releaseRight();
                    break;
                case this.down.key:
                   this.releaseDown();
                    break;
                case this.left.key:
                   this.releaseLeft();
                    break;
            }
        }
    }

    pressUp(){
        this.up.isPressed = true;
        console.log(`pressing Up`)
    }
    pressRight(){
        this.right.isPressed = true;
        console.log(`pressing Right`)
    }
    pressDown(){
        this.down.isPressed = true;
        console.log(`pressing Down`)
    }
    pressLeft(){
        this.left.isPressed = true;
        console.log(`pressing Left`)      
    }

    releaseUp(){
            this.up.isPressed = true;
            console.log(`releasing Up`)
    }
    releaseRight(){
            this.right.isPressed = true
            console.log(`releasing Right`)
    }
    releaseDown(){
            this.down.isPressed = true;
            console.log(`releasing Down`)
    }
    releaseLeft(){
            this.left.isPressed = true;
            console.log(`releasing Left`)      
    }
}