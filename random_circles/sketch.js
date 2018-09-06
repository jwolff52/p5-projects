var circles = [];
var maxattempts = 10000;

function setup() {
  createCanvas(640, 360);

  var attempts = 0;

  for (var i = 0; i < 1200; i++) {
    var circle = {
      x: random(width),
      y: random(height),
      r: random(2,12)
    };
    var overlaps = false;
    for (var j = 0; j < i; j++) {
      if (circles[j]) {
        if (dist(circle.x, circle.y, circles[j].x, circles[j].y) < circles[j].r + circle.r) {
          overlaps = true;
          break;
        }
      }
    }
    if (overlaps || circle.x - circle.r < 1 || circle.x + circle.r > width - 1 || circle.y - circle.r < 1 || circle.y + circle.r > height - 1) {
      overlaps = true;
    }
    if(!overlaps) {
      fill(255, 0, 150, 100);
      noStroke();
      ellipse(circle.x, circle.y, circle.r*2);
      circles.push(circle);
    } else if(attempts >= maxattempts) {
      attempts == 0;
      console.log("Max attempts reached for index: " + i + "! Skipping!");
      continue;
    } else {
      i--;
      attempts++;
    }
  }
}

function createArray(length) {
  var arr = new Array(length || 0), i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function mousePressed() {

}

function draw() {
  // background(51);
}
