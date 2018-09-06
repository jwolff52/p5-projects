var cells = [];

function setup() {
  createCanvas(600, 600);

  cells.push(new Cell());
  cells.push(new Cell());
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
  for (var i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}

function draw() {
  background(51);

  for (var i = 0; i < cells.length; i++) {
    cells[i].update();
  }

}

function gameOver() {
  isGameOver = true;
}
