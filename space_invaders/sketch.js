var ship;
var isGameOver = false;
var flowers = [];
var direction = 0;
var score = 0;
var flowerCols;
var flowerRows;

function setup() {
  createCanvas(800, 600);

  flowerCols = floor(width/44);
  flowerRows = floor(height * 0.67/30);
  // flowerCols = 2;
  // flowerRows = 2;

  console.log(flowerRows);
  console.log(flowerCols);

  ship = new Ship();

  flowers = createArray(flowerCols, flowerRows);

  for (var i = 1; i < flowerCols; i++) {
    for (var j = 1; j < flowerRows; j++) {
      flowers[i][j] = new Flower();
      flowers[i][j].x = i * 45;
      flowers[i][j].y = j * 30;
    }
  }

  frameRate(30);
}

function createArray(length) {
  var arr = new Array(length || 0), i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = -1;
  } else if (keyCode === RIGHT_ARROW) {
    direction = 1;
  } else if (keyCode === UP_ARROW || keyCode === 32 /* SPACE_BAR */) {
    ship.shoot();
  } else {
    console.log(keyCode);
  }
}

function keyReleased() {
  direction = 0;
  if (keyIsDown(LEFT_ARROW)) {
    direction = -1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    direction = 1;
  }
}

function draw() {
  background(51);

  if (isGameOver) {
    noLoop();
    textAlign(CENTER);
    fill(255,100,0);
    text("GAME OVER!!!\nSCORE: " + score, 0, height/2-50, 800, height/2);
  } else {
    for (var i = 1; i < flowerCols; i++) {
      for (var j = 1; j < flowerRows; j++) {
        if (!flowers[i][j].isDestroyed) {
          if (frameCount % 45 == 0) {
            flowers[i][j].move();
          }
          flowers[i][j].update();
          for (var k = 0; k < ship.projectiles.length; k++) {
            var fx = flowers[i][j].x;
            var fy = flowers[i][j].y;
            var px = ship.projectiles[k].x;
            var py = ship.projectiles[k].y;
            // console.log("px: " + px);
            // console.log("py: " + py);
            // console.log("fx: " + fx);
            // console.log("fy: " + fy);
            if (px > fx - 12 && px < fx + 12 && py > fy - 10 && py < fy + 10) {
              flowers[i][j].isDestroyed = true;
              ship.projectiles[k].isOffScreen = true;
              score++;
              console.log(score);
            }
          }

          for (var k = 0; k < flowers[i][j].projectiles.length; k++) {
            var sx = ship.x;
            var sy = ship.y;
            var px = flowers[i][j].projectiles[k].x;
            var py = flowers[i][j].projectiles[k].y;
            if (px > sx - 22 && px < sx + 22 && py > sy - 20 && py < sy + 20) {
              gameOver();
            }
          }
        }
      }
    }
    ship.update();
  }

}

function gameOver() {
  isGameOver = true;
}
