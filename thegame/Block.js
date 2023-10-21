class Block {
    constructor() {
        this.x = 50;
        this.y = canvas.height/2;
        this.width = 25;
        this.height = 25;
        this.jumpHeight = 75;
        this.jumping = false;
        this.jumpStartY = 0;
        this.motionX = 4;
    }

    draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    }

    // takes in a platform object as an argument. returns if block is on platform
     blockOnPlatform(platform) {
    if (this.x >= platform.x && this.x <= platform.x + platform.length) {
        if ( this.y === platform.y - this.y ){
            return true;
        }
        
    }

    return false;
    }
    update() {
        if ( rightPressed && this.motionX < 0 || leftPressed && this.motionX > 0 ) {
            this.motionX = -this.motionX;
        }
    
        if (this.x <= 2 || this.x >= canvas.width - this.width) {
            this.motionX = -this.motionX;
        }
    
        this.x += this.motionX;
    }
}
export default Block;