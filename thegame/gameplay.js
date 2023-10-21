let rightPressed;
let leftPressed;
let upPressed;
const GRAVITY = 0.5;

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let players = [];
let player1 = new Block();
players.push(player1);

let platforms = [];
let platform1 = new Platform(200, 350, 100, 300);
platforms.push(platform1);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
}


function updateGameData() {
    // update position and check for collision
    players.forEach((player)=>{
        player.update(platforms)
    });

}

function drawLevel() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "white";
    // ctx.fillRect(200, 200, 50, 50);
    // ctx.fillStyle = "brown";
    // ctx.fillRect(150, 250, 150, 150);
}

function draw() {
    // draw in order of
    // background
    // ground and obstacles
    // players
    // On top of screen UI
    drawLevel();
    players.forEach((player)=>{
        player.draw()
    });
    platforms.forEach((platform)=>{
        platform.draw()
    });

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
