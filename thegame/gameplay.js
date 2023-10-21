let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(200, 200, 50, 50);
ctx.fillStyle = "brown";
ctx.fillRect(150, 250, 150, 150);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
    
}

function draw() {
    // draw in order of
    // background
    // ground and obstacles
    // players
    // On top of screen UI

}

function gameLoop() {
    // potentially pull from server for multiplayer data
    // update game data
    // draw
    requestAnimationFrame(gameLoop);
}

function gameStart() {
    // load assets
    // load levels and initiate characters
    gameLoop();
}

gameStart();


