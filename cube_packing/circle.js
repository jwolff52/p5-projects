function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;

  this.grow = function() {
    if (this.growing) {
      this.r++;
    }
  }

  this.edges  = function() {
    return (this.x - this.r < 1 || this.x + this.r > width - 1 || this.y - this.r < 1 || this.y + this.r > height - 1);
  }

  this.show = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r*2);
  }
}
