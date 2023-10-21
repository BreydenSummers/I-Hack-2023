class Platform {
    constructor(x, y, width=100, height=10, color='#ff5') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }    
}
