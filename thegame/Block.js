class Block {
    constructor() {
        this.x = 150;
        this.y = canvas.height/2;
        this.width = 25;
        this.height = 25;
        this.motionX = 7;
        this.motionY = 0;
        this.onPlatform = false;
        this.color = "#FF46F4";
    }

    draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    }

    blockJump() {
        if ( upPressed && (this.onBottom() || this.onPlatform) ) { // true should be on platform
            this.motionY = -10;
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
    
        if( !this.onBottom() ){ // if not on platform
            this.motionY += GRAVITY;
        }

        platforms.forEach((platform)=>{
            if (
                    this.y + this.height + this.motionY > platform.y
                &&  this.y + this.motionY < platform.y + platform.height
            ) {
                if (
                    (
                        //collide right
                            this.motionX > 0
                            &&  this.x + this.width + this.motionX > platform.x
                            &&  this.x + this.width < platform.x
                            && !(this.x + this.motionX > platform.x + platform.width )
                            )
                            ) {
                                this.motionX = -1 * Math.abs(this.motionX);
                                this.x = platform.x - this.width - 1;
                            }
                if (
                    (
                        //collide left
                            this.motionX < 0
                            &&  this.x + this.motionX <= platform.x + platform.width
                            &&  this.x >= platform.x + platform.width
                            //&&  !(this.x + this.width + this.motionX < platform.x)
                    )
                ) {
                    this.motionX = 1 * Math.abs(this.motionX);
                    this.x = platform.x + platform.width + 1;
                }
            }

            //
            if (
                this.x + this.width + this.motionX > platform.x
            &&  this.x + this.motionX < platform.x + platform.width
            ) {
                if (
                    this.y + this.height + this.motionY > platform.y
                &&  this.y + this.height < platform.y
                ) {
                    this.onPlatform = true;
                    this.motionY = 0;
                    this.y = platform.y - this.height - 1;
                }
                else {
                    this.onPlatform = false;
                }
            }
            // check if top hits a platform 
            if ( this.y <= platform.y + platform.height ) {
                if ( this.x > platform.x && this.x < platform.x + platform.width ) {
                    this.y = platform.y + platform.height; 
                }
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