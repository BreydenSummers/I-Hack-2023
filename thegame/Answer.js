class Answer {
    constructor(x, y, text, correct) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.style = "rgba(0,0,255,0.2)";
        this.text = text;
        this.correct = correct;
        this.winning_player = null;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = this.style;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.font = "1em Arial";
        var textWidth = ctx.measureText(this.text).width;
        if(textWidth > 90){
            ctx.font = "0.5em Arial";

        }
        textWidth = ctx.measureText(this.text).width;
        const textX = this.x + (this.width - textWidth) / 2;
        const textY = this.y + this.height / 2;
        ctx.fillText(this.text, textX, textY);
    }  
    update(players){
       players.forEach((player)=>{
            if(
                player.x < this.x + this.width &&
                player.x + player.width > this.x &&
                player.y < this.y + this.height &&
                player.y + player.height > this.y
            ){
                if(this.correct){
                    this.style = "rgba(0,255,0,0.4)"
                    this.winning_player = player.name;
                }else{
                    this.style = "rgba(255, 0,0,0.4)"
                }

            }
       });
    } 
}