class Block {
    constructor(color) {
        this.x = 150;
        this.y = canvas.height/2;
        this.width = 25;
        this.height = 25;
        this.motionX = 5;
        this.motionY = 0;
        this.onPlatform = false;
        this.color = color;
    }

    draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
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

    update(platforms, inputs) {
        // check jump
        if ( inputs.upPressed && (this.onBottom() || this.onPlatform) ) { // true should be on platform
            this.motionY = -10;
        }

        // check right and left
        if ( inputs.rightPressed && this.motionX < 0 || inputs.leftPressed && this.motionX > 0 ) {
            this.motionX = -this.motionX;
        }
    
        // right and left screen bounds
        if (this.x <= 2 || this.x >= canvas.width - this.width) {
            this.motionX = -this.motionX;
        }
    
        // add gravity if not grounded
        if( !this.onBottom() ){ // if not on platform
            this.motionY += GRAVITY;
        }

        // reset parameters, this line needs to be here
        this.onPlatform = false;

        platforms.forEach((platform)=>{
            // fits y range
            if (
                    this.y + this.height + this.motionY > platform.y
                &&  this.y + this.motionY < platform.y + platform.height
            ) {
                //collide right
                if (
                    this.motionX > 0
                &&  this.x + this.width + this.motionX >= platform.x
                &&  this.x + this.width <= platform.x
                //&& !(this.x + this.motionX > platform.x + platform.width )
                ) {
                    this.motionX = -1 * Math.abs(this.motionX);
                    this.x = platform.x - this.width - 1;
                }
                //collide left
                if (
                    this.motionX < 0
                &&  this.x + this.motionX <= platform.x + platform.width
                &&  this.x >= platform.x + platform.width
                //&&  !(this.x + this.width + this.motionX < platform.x)
                ) {
                    this.motionX = 1 * Math.abs(this.motionX);
                    this.x = platform.x + platform.width + 1;
                }
            }

            // fits x range
            if (
                this.x + this.width + this.motionX > platform.x
            &&  this.x + this.motionX < platform.x + platform.width
            ) {
                // collide bottom
                if (
                    this.y + this.height + this.motionY > platform.y
                &&  this.y + this.height < platform.y
                ) {
                    this.onPlatform = true;
                    this.motionY = 0;
                    this.y = platform.y - this.height - 1;
                }
                // collide top
                if (
                    this.y + this.motionY < platform.y + platform.height
                &&  this.y > platform.y + platform.height
                ) {
                    this.motionY = 0;
                    this.y = platform.y + platform.height + 1;
                }
            }
        });
        
        // increment speed
        this.x += this.motionX;
        this.y += this.motionY;

        // block top bound
        if ( this.y <= 0 ) {
            this.motionY = 0;
            this.y = 0;
        }

        //block bottom bound
        if ( this.onBottom() ) {
            this.motionY = 0;
            this.y = canvas.height - this.height;
        }
    }
}