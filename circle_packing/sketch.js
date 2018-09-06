var circles = [];

function setup() {
  createCanvas(640, 360);
}

function createArray(length) {
  var arr = new Array(length || 0), i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function draw() {
  background(51);

  var circle = newCircle();
  if (circle) {
    circles.push(circle);
  }

  for (var i = circles.length - 1; i >= 0; i--) {
    circles[i].growing = !circles[i].edges();
    if(circles[i].growing) {
      for(var j = 0; j < circles.length; j++) {
        if (j != i) {
          if (dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y) < circles[i].r + circles[j].r) {
            circles[j].growing = false;
            circles[i].growing = false;
            break;
          }
        }
      }
    }

    if (circles[i].y + circles[i].r < 0) {
      circles.splice(i, 1);
    } else {
      circles[i].grow();
      circles[i].fall();
      circles[i].show();
    }
  }
}

function newCircle() {
  var circle = new Circle(random(width), random(height+50, height + 200));
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    if (dist(circle.x, circle.y, circles[i].x, circles[i].y) < circles[i].r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return circle;
  }
  return false;
}
