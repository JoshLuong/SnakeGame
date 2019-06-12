// 

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

let game;
let badAppleMove;

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const blackApple = new Image();
blackApple.src = "img/badApple.png";

// const badAppleImg = new Image();
// foodImg.src = "img/food.png";


// load audio files

let dead = new Audio();
// let eat = new Audio();
// let up = new Audio();
// let right = new Audio();
// let left = new Audio();
// let down = new Audio();

dead.src = "audio/dead.mp3";
// eat.src = "audio/eat.mp3";
// up.src = "audio/up.mp3";
// right.src = "audio/right.mp3";
// left.src = "audio/left.mp3";
// down.src = "audio/down.mp3";

// BAD APPLE

var xSpeed = 5;
var ySpeed = 5;


// create the snake

let snake = [];


snake[0] = {
    x : 9 * box,
    y : 10 * box
};
let snakeX ;
let snakeY ;

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let badApple = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
// // create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
      
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        r
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function gameOverScreen(){
	clearInterval(game);
    clearInterval(badAppleMove);
	document.getElementById("gameOver").innerHTML = "GAME OVER!";
}

function moveTimer()
{
	ctx.beginPath(); 
	ctx.drawImage(blackApple, badApple.x,badApple.y);
	ctx.closePath();
   if (badApple.x > 17 * box ){ // x>border
   xSpeed = -xSpeed;
	}

   if (badApple.x < box){ // x<0
   xSpeed = -xSpeed;
	}
   if (badApple.y  > 17*box ){
   ySpeed = -ySpeed }

   if (badApple.y < 3*box){
   ySpeed = -ySpeed}

   badApple.x = badApple.x + xSpeed;
   badApple.y = badApple.y + ySpeed;

   
   console.log(badApple.y);
   console.log(badApple.x);
   console.log("snake Y" +snakeY);
   console.log("snake X"+snakeX);
   // check for collisions

   if ((snakeX < badApple.x+20) && (snakeX +20> badApple.x) && (snakeY < badApple.y+20) && (snakeY+20 > badApple.y)){
	gameOverScreen();
   }

   
}

// draw everything to the canvas
function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
       
    }
    
    ctx.drawImage(foodImg, food.x, food.y);

    
    
    //moveTimer();
     snakeX = snake[0].x;
     snakeY = snake[0].y;
    // old head position
    
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
       
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
	
	//moveTimer();
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    
      //  ctx.clearRect(0, 0, canvas.width, canvas.height);

        gameOverScreen();
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

function startEasyMode() {	
  //document.getElementById(startPage).innerHTML = "";
  document.getElementById("startPage").style.display = "none";
  game = setInterval(draw,100);
  
}
function startHardMode() {	
  //document.getElementById(startPage).innerHTML = "";
  document.getElementById("startPage").style.display = "none";
   document.getElementById("snakeIMG").style.display = "none";
  game = setInterval(draw,100);
  badAppleMove = setInterval(moveTimer,100);
  
}
// let game = setInterval(draw,100);