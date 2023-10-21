let rightPressed;
let leftPressed;
let motionDirection = 1;

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

let blockWidth = 25;
let blockX = (canvas.width-blockWidth)/2;

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

function updateBlock() {
    if (rightPressed) {
        blockX += 7;
    }

    else if (leftPressed) {
        blockX -= 7;
    }
}

function updateGameData() {
    // update position and check for collision
    updateBlock();
}

function drawLevel() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(200, 200, 50, 50);
    ctx.fillStyle = "brown";
    ctx.fillRect(150, 250, 150, 150);
}

function drawBlock() {
    ctx.beginPath();
    ctx.rect(blockX, canvas.height/2, blockWidth, blockWidth);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // draw in order of
    // background
    // ground and obstacles
    // players
    // On top of screen UI
    drawLevel();
    drawBlock();
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