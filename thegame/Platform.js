class Platform {
    constructor(x, y, width=100, height=10) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#ff5"
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }    
}
