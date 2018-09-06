function Cell(pos, r, c) {

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  this.r = r || 80;
  this.c = c || color(random(100, 255), 0, random(100, 255), 100);

  this.move = function(dir) {
    var vel = p5.Vector.random2D();
    this.pos.add(vel);

  }

  this.update = function() {
    this.move();
    this.show();
  }

  this.show = function() {
    fill(this.c);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.r);
    // rect(100, 100, 20, 20);
  }

  this.clicked = function(x, y) {
    var d = dist(this.pos.x, this.pos.y, x, y);

    return d < this.r;
  }

  this.mitosis = function() {
    var cell = new Cell(this.pos, this.r/2, this.c);
    return cell;
  }
}
