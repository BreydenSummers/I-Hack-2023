
var data;
var running = false;   
var loading = false;
var questionTime = Date.now();
var questionBool = false;
var winning_player = null;
var winning = false;
var show_winning_time = Date.now();

const FPS = 60;
const FRAME_DURATION = 8 / FPS;
let current_frame_duration = 0;
var questionPrint = false;

let rightPressed1;
let leftPressed1;
let upPressed1;
let rightPressed2;
let leftPressed2;
let upPressed2;
const GRAVITY = 0.6;

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let players = [];
let player1 = new Block("#FF46F4", "Player 1");
players.push(player1);
let player2 = new Block("#0ff", "Player 2");
players.push(player2);

var mapNum = Math.floor(Math.random() * 2) + 1;
let platforms = [];
let Answers = [];
let AnswerPos = [[0,0], [0,0], [0,0], [0,0]];
let gamePlatforms = [];
let playerNum = 2;


if (mapNum == 1){
    gamePlatforms = [
        new Platform(canvas.width, 0, 50, canvas.height),
        new Platform(-50, 0, 50, canvas.height),
        new Platform( canvas.width/2, canvas.height/2),
        new Platform(100, canvas.height-(canvas.height/6)),
        new Platform(300, canvas.height-(canvas.height/4))
    ];
}
else if (mapNum == 2){
    gamePlatforms = [
        new Platform(canvas.width, 0, 50, canvas.height),
        new Platform(-50, 0, 50, canvas.height),
        new Platform(0, canvas.height-250, 100, 100),
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
    AnswerPos = [[0, 40], [0, 375], [canvas.width-100, 375], [canvas.width-100 , 40]];
}
else if (mapNum == 3){
    gamePlatforms = [
        new Platform(canvas.width, 0, 50, canvas.height),
        new Platform(-50, 0, 50, canvas.height),
        new Platform(155, 200, 100, 30),
        new Platform(255, 175, 100, 30),
        new Platform(355, 150, 100, 30),
        new Platform(455, 175, 100, 30),
        new Platform(555, 200, 100, 30)
    ];
    AnswerPos = [[0, 40], [0, 375], [canvas.width-100, 375], [canvas.width-100 , 40]];
}


let game1 = new Map(gamePlatforms);

function setupAnswer(x, y, text, correct){
    let answer = new Answer(x,y, text, correct);
    Answers.push(answer);
}

function setupPlayers(num){
    playerNum = num
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed1 = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed1 = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed1 = true;
    }
    if(e.key == "d") {
        rightPressed2 = true;
    }
    else if(e.key == "a") {
        leftPressed2 = true;
    }
    else if(e.key == "w") {
        upPressed2 = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed1 = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed1 = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed1 = false;
    }
    if(e.key == "d") {
        rightPressed2 = false;
    }
    else if(e.key == "a") {
        leftPressed2 = false;
    }
    else if(e.key == "w") {
        upPressed2 = false;
    }
}


function updateGameData() {
    // update position and check for collision
    player1.update(
        game1.platforms, 
        {
            upPressed: upPressed1 && true,
            leftPressed: leftPressed1 && true,
            rightPressed: rightPressed1 && true
        }
    )
    player2.update(
        game1.platforms, 
        {
            upPressed: upPressed2 && true,
            leftPressed: leftPressed2 && true,
            rightPressed: rightPressed2 && true
        }
    )
    Answers.forEach((answer) => {
        answer.update(players);
        if (answer.winning_player) {
            winning_player = answer.winning_player;
            answer.winning_player = null;
        }
    })

    gamePlatforms.forEach((platform)=>{
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
    if(winning == true) {
        document.getElementById("winning").style.display = "flex";
        const winner = document.getElementById("winning_player");
        winner.innerHTML = winning_player + " wins!!!";
    }
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
                if(winning_player) {
                    winning = true;
                }
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
        setupAnswer(AnswerPos[0][0],AnswerPos[0][1],answer1, "A" == data["solution"]);
        setupAnswer(AnswerPos[1][0],AnswerPos[1][1],answer2, "B" == data["solution"]);
        setupAnswer(AnswerPos[2][0],AnswerPos[2][1],answer3, "C" == data["solution"]);
        setupAnswer(AnswerPos[3][0],AnswerPos[3][1],answer4, "D" == data["solution"]);
    })
    .then(run4 => {if(playerNum == 1){
        player2.x = 100000000000;
}});
}


function gameStart() {
    // load assets
    // load levels and initiate characters
    if(document.getElementById("titleScreen").style.display != "none"){
        gameLoop();
    }
    
}

gameStart();
