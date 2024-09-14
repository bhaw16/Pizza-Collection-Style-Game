//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
var score = 0;
var backgroundImg, catcherImg, fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/pixel_food_gif.gif");
  fallingObjectImg = loadImage("assets/pizza.png");
  catcherImg = loadImage("assets/124-1242185_empty-pizza-box-clip-art-empty-pizza-box-clipart.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  //Resize images
  backgroundImg.resize(width, height);
  catcherImg.resize(100, 100);
  fallingObjectImg.resize(50, 50);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,100, "k");
  //catcher.collider = "k";
  catcher.color = color(95,158,160);
  //catcher.img = catcherImg;
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, random(width + 1),50,50);
  fallingObject.color = color(0,128,128);
  //fallingObject.img = fallingObjectImg;
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(255,255,255);
  //Draw background image
  image(backgroundImg, 0, 0);
  backgroundImg.pause();
  backgroundImg.play();
  // Draw directions to screen
  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Move the \npizza box with the \nleft and right \narrow keys to \ncatch the falling \npizza slices.", width-100, 20);
  textSize(15);
  text(`Score: ${score}/8`, 20, 20);
  textAlign(CENTER);
  textSize(20);
  text("Collect 8 slices to win!", width / 2, 20);
  //If fallingObject reaches bottom, move back to random position at the top
  if (fallingObject.y >= height) {
    fallingObject.pos = {x: random(width + 1), y: 0};
    fallingObject.vel.y = random(1, 5);
    score--;
    // score = score - 1;
    // score -= 8 == score = score - 8;
  }
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  }
  else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  }
  else {
    catcher.vel.x = 0;
  }
  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  }
  else {
    if (catcher.x > 350) {
      catcher.x = 350;
    }
  }
  //If fallingObject collides with catcher, move back to random position at the top
  if (fallingObject.collides(catcher)) {
    fallingObject.pos = {x: random(width + 1), y: 0};
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score++;
    //score = score + 1;
    //score += 8 == score = score + 8;
  }
  if (score < 0) {
    youLose();
  }
  else {
    if(score == 8) {
      youWin();
    }
  }
  //allSprites.debug = mouse.pressing();
}

function youLose() {
  background(255, 255, 255);
  //Draw background image
  image(backgroundImg, 0, 0);
  backgroundImg.pause();
  backgroundImg.play();
  catcher.pos = {x: -500, y: -500};
  fallingObject.pos = {x: 900, y: 900};
  textAlign(CENTER);
  textSize(30);
  text("You lose!\n", 200, 150);
  textSize(12);
  text("Click the screen to play again.", 200, 300);
  if (mouseIsPressed) {
    restart();
  }
}

function youWin() {
  background(255, 255, 255);
  //Draw background image
  image(backgroundImg, 0, 0);
  backgroundImg.pause();
  backgroundImg.play();
  catcher.pos = {x: -500, y: -500};
  fallingObject.pos = {x: -900, y: -900};
  textAlign(CENTER);
  textSize(30);
  text("You win!\n", 200, 150);
  textSize(12);
  text("Click the screen to play again.", 200, 300);
  if (mouseIsPressed) {
    restart();
  }
}

function restart() {
  score = 0;
  // Draw directions to screen
  background(255,255,255);
  //Draw background image
  image(backgroundImg, 0, 0);
  backgroundImg.pause();
  backgroundImg.play();
  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Move the \npizza box with the \nleft and right \narrow keys to \ncatch the falling \npizza slices.", width-100, 20);
  textSize(15);
  text(`Score: ${score}/8`, 20, 20);
  textAlign(CENTER);
  textSize(20);
  text("Collect 8 slices to win!", width / 2, 20);
  catcher.pos = {x: 200, y: 380};
  fallingObject.pos = {x: random(width + 1), y: 0};
  fallingObject.vel.y = random(1, 5);
  fallingObject.direction = "down";
}