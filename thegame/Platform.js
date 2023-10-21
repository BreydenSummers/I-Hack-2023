class Platform {
    constructor(x, y, width=100, height=10, moveHorizontal=false, moveVertical=false) {
        this.x = x;
        this.xOrigin = x;
        this.yOrigin = y;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#ff5"
        this.movementRange = 50;
        this.moveHorizontal  = moveHorizontal;
        this.moveVertical = moveVertical;
        this.dx = 1;

    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }    

    update() {
        if ( this.moveHorizontal ){
            
            if ( this.dx > 0 && this.x + this.dx >= this.xOrigin + this.movementRange){
                this.dx = -this.dx;
            }
            else if (this.dx < 0 && this.x + this.dx <= this.xOrigin - this.movementRange) {
                this.dx = -this.dx;
            }
            this.x += this.dx;
        }
    //     if ( this.moving ){
    //         if ( this.moveHorizontal ) {
    //             if (this.x + this.dx  <= this.xOrigin + this.movementRange) {
    //                 this.dx = -this.dx; 
    //             }
    //             this.x += this.dx;
    //         }
    //     }
    // }
    }
}
