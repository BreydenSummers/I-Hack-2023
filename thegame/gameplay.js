
var data;
var running = false;   
var loading = false;
var questionTime = Date.now();
var questionBool = false;

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
let Answers = [];
let AnswerPos = [[0,0], [0,0], [0,0], [0,0]];


let game1Platforms = [
    new Platform( canvas.width/4, canvas.height * 0.85, moveHorizontal=true),
    new Platform(0, 0),
    new Platform(300, canvas.height-(canvas.height/4))
];
let game2Platforms = [
    new Platform(0, canvas.height-250, 100, 100, ),
    new Platform(0, canvas.height-25, 100, 100),
    new Platform(100, canvas.height-200, 100, 100),
    new Platform(200, canvas.height-150, 100, 100),
    new Platform(canvas.width-100, canvas.height-250, 100, 100),
    new Platform(canvas.width-100, canvas.height-25, 100, 100),
    new Platform(canvas.width-200, canvas.height-200, 100, 100),
    new Platform(canvas.width-300, canvas.height-150, 100, 100),
    new Platform(260, canvas.height-80, 100, 30),
    new Platform((canvas.width/2)+50, canvas.height - 80, 100, 30),

    new Platform(155, 200, 100, 30),
    new Platform(255, 175, 100, 30),
    new Platform(355, 150, 100, 30),
    new Platform(455, 175, 100, 30),
    new Platform(555, 200, 100, 30)
];

let game3Platforms = [
    new Platform(canvas.width/2 - 10, canvas.height/2 - 10, 5, 5)
]

AnswerPos = [[0, 40], [0, 375], [canvas.width-100, 375], [canvas.width-100 , 40]];
let game1 = new Map(game2Platforms);

function setupAnswer(x, y, text, correct){
    let answer = new Answer(x,y, text, correct);
    Answers.push(answer);
}


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
    game1Platforms.forEach((platform)=>{
        platform.update()
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
    Answers.forEach((answer) => {
        answer.draw();
    });

}

let start = Date.now();
let doLoop = true
function gameLoop() {
    if(running == true && loading == false){
        document.getElementById("titleScreen").style.display = "none"
        document.getElementById("loading").style.display = "none";
        document.getElementById("questionDisplay").style.display = "none";

        if(Date.now() - questionTime > 5000){
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
        } else{
            if(questionBool == false){
                const question = document.createElement("h1");
                question.innerHTML = data['question'];
                question.id = "questionloading";
                document.getElementById("questionDisplay").appendChild(question);

                const div = document.createElement("div");
                div.innerHTML = 5 - (Date.now() - questionTime) / 1000;
                div.id = "questionTime";
                document.getElementById("questionDisplay").appendChild(div);

            }
            questionBool = true;
            document.getElementById("questionDisplay").style.display = "flex";
            document.getElementById("questionTime").innerHTML = Math.round(5 - (Date.now() - questionTime) / 1000);




        }

        if(doLoop){
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
    doLoop = false;
    if(Date.now() - start > FRAME_DURATION){
        start = Date.now()
        doLoop = true;
    }
    // current_frame_duration += Date.now() - start;
    // if (current_frame_duration - start > FRAME_DURATION) {
    //     current_frame_duration = 0;
    // }

    requestAnimationFrame(gameLoop);
}
function bootstrapGame(form){
    console.log(form)
    loading = true;
    fetch("http://34.41.134.6:5000/getquestion/" + form.callai.value)
    .then(response => response.json())
    .then(jsonData => data = jsonData)
    .then(jsonData => console.log(jsonData))
    .then(run0 => questionTime = Date.now())
    .then(run1 => running = true)
    .then(run2 => loading = false)
    .then(run3 => {

        answer1 = data["answers"]["A"];
        answer2 = data["answers"]["B"];
        answer3 = data["answers"]["C"];
        answer4 = data["answers"]["D"];
        console.log(AnswerPos[0][0])
        setupAnswer(AnswerPos[0][0],AnswerPos[0][1],answer1, "A" == data["solution"]);
        setupAnswer(AnswerPos[1][0],AnswerPos[1][1],answer2, "B" == data["solution"]);
        setupAnswer(AnswerPos[2][0],AnswerPos[2][1],answer3, "C" == data["solution"]);
        setupAnswer(AnswerPos[3][0],AnswerPos[3][1],answer4, "D" == data["solution"]);
    });
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
