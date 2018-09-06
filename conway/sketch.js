var ship;
var isGameOver = false;
var cells = [];
var rows, cols;
var looping = false;
var generation = 0;

function setup() {
  createCanvas(800, 600);
  background(51);

  cols = width/5
  rows = height/5

  cells = createArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cells[i][j] = new Cell();
      cells[i][j].x = i * 5;
      cells[i][j].y = j * 5;
    }
  }

  frameRate(5);
  noLoop();
}

function createArray(length) {
  var arr = new Array(length || 0), i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function updateState(i, j) {
  var aliveNeighbors = 0;
  for(var ni = -1; ni <= 1; ni++) {
    for(var nj = -1; nj <= 1; nj++) {
      var di = i+ni;
      var dj = j+nj;
      if (inValidCell(di, dj) || (i == di && j == dj)) {
        continue;
      }
      if (cells[di][dj].currentState) {
        aliveNeighbors+=1;
      }
    }
  }
  if (cells[i][j].currentState) {
    if (aliveNeighbors == 2 || aliveNeighbors == 3) {
      return true;
    }
    return false;
  }
  return aliveNeighbors === 3;
}

function inValidCell(i, j) {
  return i < 0 || i > cols - 1 || j < 0 || j > rows - 1;
}

function mouseReleased() {
  console.log(mouseButton);
  if(mouseButton == LEFT) {
    var i = floor(mouseX/5);
    var j = floor(mouseY/5);
    if(!inValidCell(i, j)) {
      cells[i][j].currentState = !cells[i][j].currentState;
      cells[i][j].show();
      console.log(i + " " + j);
    }
  } else if(mouseButton == RIGHT) {
    if(looping) {
      noLoop();
      console.log("frozen");
    } else {
      loop();
      console.log("looping")
    }
    looping = !looping;
  }
  return false;
}

function draw() {
  background(51);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cells[i][j].nextState = updateState(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cells[i][j].currentState = cells[i][j].nextState;
      cells[i][j].show();
    }
  }

  generation++;
  fill(255);
  noStroke();
  textSize(20);
  text(generation + "", 10, 15);
}
