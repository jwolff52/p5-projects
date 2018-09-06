var snake;
var apple;
var scl = 10;
var minFrameRate = 5;
var maxFrameRate = 20;
var columns = 30;
var rows = 30;
var isGameOver = false;
var isSelfCollision = false;
var iterRemaining = 0;
var score;

function setup() {
  createCanvas(300, 300);

  snake = new Snake();
  apple = createApple();

  frameRate(minFrameRate);
}

function createApple() {
  var a = new Apple();
  a.x = floor(random(columns))*scl;
  a.y = floor(random(rows))*scl;
  return a;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  }
}

function draw() {
  background(51);

  if (isGameOver) {
    iterRemaining--;
    if (iterRemaining <= 0) {
      snake.x = -40;
      snake.y = -40;
      snake.tail = []
      snake.total = 0;
      noLoop();
    }
    textAlign(CENTER,CENTER);
    fill(255,100,0);
    text("GAME OVER!!!\nSCORE: " + score, 0, 0, width, height);
    if (!isSelfCollision) {
      snake.move();
    } else {
      snake.moveTail();
    }
    snake.show();
  } else {
    if (snake.eat(apple)) {
      apple = createApple();
    }
    apple.show();

    snake.update();
  }

}

function gameOver() {
  isGameOver = true;
  iterRemaining = snake.total + 1;
  score = snake.total;
  textAlign(CENTER,CENTER);
  fill(255,100,0);
  text("GAME OVER!!!\nSCORE: " + score, 0, 0, width, height);
}
