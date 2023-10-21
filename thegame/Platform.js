class Platform {
<<<<<<< Updated upstream
    constructor(x, y, width, height) {
=======
    constructor(x, y, width=100, height=10, moving=false) {
>>>>>>> Stashed changes
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
<<<<<<< Updated upstream
=======
        this.color = "#ff5"
        this.moving = moving;
>>>>>>> Stashed changes
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = "#ff5";
        ctx.fill();
        ctx.closePath();
    }    
}
