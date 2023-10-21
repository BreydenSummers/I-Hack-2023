class Block {
    constructor() {
        this.x = 50;
        this.y = canvas.height/2;
        this.width = 25;
        this.height = 25;
        this.jumpHeight = 75;
        this.jumping = false;
        this.jumpStartY = 0;
        this.motionX = 7;
        this.motionY = 0;
    }

    draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    }

    blockJump() {
        if ( upPressed && this.onBottom() ) { // true should be on platform
            this.motionY = -7;
        }
    }

    onBottom() {
        return this.y >= canvas.height - this.height;
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

    update(platforms) {
        this.blockJump();
        if ( rightPressed && this.motionX < 0 || leftPressed && this.motionX > 0 ) {
            this.motionX = -this.motionX;
        }
    
        if (this.x <= 2 || this.x >= canvas.width - this.width) {
            this.motionX = -this.motionX;
        }
    
        if( true ){ // if not on platform
            this.motionY += GRAVITY;
        }

        platforms.forEach((platform)=>{
            if(
                // move left
                (
                this.motionX < 0 &&
                this.x + this.motionX < platform.x + platform.width &&
                this.y + this.height + this.motionY > platform.y &&
                this.y + this.motionY < platform.y + platform.height
                )
                ||
                // move right
                (
                this.motionX > 0 &&
                this.x + this.width + this.motionX > platform.x &&
                this.y + this.height + this.motionY > platform.y &&
                this.y + this.motionY < platform.y + platform.height
                )
            ) {
                this.motionX = -this.motionX
            }
        });
        
        this.x += this.motionX;

        this.y += this.motionY;

        if ( this.y <= 0 ) {
            this.motionY = 0;
            this.y = 0;
        }

        if ( this.onBottom() ) {
            this.motionY = 0;
            this.y = canvas.height - this.height;
        }
    }
}