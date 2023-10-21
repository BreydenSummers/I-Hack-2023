
var data;
var running = false;   
var loading = false;

const FPS = 60;
const FRAME_DURATION = 8 / FPS;
let current_frame_duration = 0;
var questionPrint = false;

let rightPressed;
let leftPressed;
let upPressed;
const GRAVITY = 0.6;

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let players = [];
let player1 = new Block();
players.push(player1);

let platforms = [];
// let platform1 = new Platform(200, 350, 100, 300);
// platforms.push(platform1);
// let platform2 = new Platform(300, 470, 100, 30);
// platforms.push(platform2);


let game1Platforms = [
    new Platform( canvas.width/2, canvas.height/2),
    new Platform(100, canvas.height-(canvas.height/6)),
    new Platform(300, canvas.height-(canvas.height/4))

]

let game1 = new Map(game1Platforms);





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
        player.update(game1.platforms)
    });

}

function drawLevel() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game1.render();
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
    game1.platforms.forEach((platform)=>{
        platform.draw()
    });

}

function gameLoop() {
    let start = Date.now();
    if(running == true && loading == false){
        document.getElementById("titleScreen").style.display = "none"
        document.getElementById("loading").style.display = "none";
        if(questionPrint == false){
            const question = document.createElement("h1");
            question.innerHTML = data['question'];
            question.id = "question";
            document.getElementById("questionBox").appendChild(question);
            questionPrint = true;
        }

        if(current_frame_duration === 0){
            // potentially pull from server for multiplayer data
            // update game data
            updateGameData();
            draw();
            console.log(data);
        }
   } else if(running == false && loading == true){
        document.getElementById("titleScreen").style.display = "none"
        document.getElementById("loading").style.display = "flex"


    }
    current_frame_duration += Date.now() - start;
    if (current_frame_duration > FRAME_DURATION) {
        current_frame_duration = 0;
    }

    requestAnimationFrame(gameLoop);
}
function bootstrapGame(form){
    console.log(form)
    loading = true;
    fetch("http://34.41.134.6:5000/getquestion/" + form.callai.value)
    .then(response => response.json())
    .then(jsonData => data = jsonData)
    .then(jsonData => console.log(jsonData))
    .then(run => running = true)
    .then(run2 => loading = false);
}


function gameStart() {
    // load assets
    // load levels and initiate characters
    if(document.getElementById("titleScreen").style.display != "none"){
        gameLoop();
        console.log('rusd');
    }
    
}

gameStart();
