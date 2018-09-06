var circles = [];
var centers = []
var picture;

function preload() {
    picture = loadImage("data/penis.png");
}

function setup() {
  createCanvas(640, 360);

  picture.loadPixels();
  for (var i = 0; i < picture.pixels.length; i += 4) {
    var r = picture.pixels[i];
    var g = picture.pixels[i+1];
    var b = picture.pixels[i+2];
    var a = picture.pixels[i+3];
    pixels.push(color(r, g, b, a));
  }
  console.log(pixels.length);

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var index = i + j * width;
      var bright = brightness(pixels[index]);
      if (bright > 1) {
        centers.push(createVector(i,j));
      }
    }
  }
  console.log(centers.length);
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

  if (frameCount < 60) {
    image(picture,0,0,width,height);
  } else {
    background(0);
    var created = 0;

    for (var i=0; i < 10; i++) {
      var circle = newCircle();
      if (circle) {
        circles.push(circle);
        created++;
      }
    }

    if (created === 0) {
      console.log("FINISHED");
      noLoop();
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
        circles[i].show();
      }
    }
  }
}

function newCircle() {
  var center = centers[floor(random(centers.length-1))];
  var circle = new Circle(center.x, center.y, randomColor());
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



function randomColor() {
  var r = random(25, 255);
  var g = random(25, 255);
  var b = random(25, 255);
  return color(r, g, b);
}
