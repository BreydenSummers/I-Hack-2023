
var data;
var running = false;   

let rightPressed;
let leftPressed;
let upPressed;
const GRAVITY = 0.6;

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
    player1.update();
}

function drawLevel() {
    ctx.fillStyle = "#000000";
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
    player1.draw();
}

function gameLoop() {
    console.log("I am running")
    if(running == true){
        document.getElementById("titleScreen").style.visibility = "hidden"
        // potentially pull from server for multiplayer data
        // update game data
        updateGameData();
        draw();
        // draw
        console.log(data);
   }
   requestAnimationFrame(gameLoop);


}
function bootstrapGame(form){
    console.log(form)
    fetch("http://34.41.134.6:5000/getquestion/" + form.callai.value)
    .then(response => response.json())
    .then(jsonData => data = jsonData)
    .then(jsonData => console.log(jsonData))
    .then(run => running = true);

    // gameStart();
}


function gameStart() {
    // load assets
 
    // load levels and initiate characters
    if(document.getElementById("titleScreen").style.visibility != "visible"){
        gameLoop();
    }
    
}

gameStart();


