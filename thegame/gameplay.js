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

let rightPressed;
let leftPressed;

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let player1 = new Block();

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function updateGameData() {
    // update position and check for collision
    player1.update();
}

function drawLevel() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "white";
    // ctx.fillRect(200, 200, 50, 50);
    // ctx.fillStyle = "brown";
    // ctx.fillRect(150, 250, 150, 150);
}


function blockJump() {

}

function draw() {
    // draw in order of
    // background
    // ground and obstacles
    // players
    // On top of screen UI
    drawLevel();
    player1.draw();
}

function gameLoop() {
    // potentially pull from server for multiplayer data
    // update game data
    updateGameData();
    draw();

    // draw
    requestAnimationFrame(gameLoop);
}

function gameStart() {
    // load assets
    // load levels and initiate characters
    gameLoop();
}

gameStart();

