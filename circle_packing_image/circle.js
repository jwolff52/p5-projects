function Circle(x, y, c) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;
  this.color = c;

  this.grow = function() {
    if (this.growing) {
      this.r++;
    }
  }

  this.edges  = function() {
    return (this.x - this.r < 1 || this.x + this.r > width - 1 || this.y - this.r < 1);
  }

  this.fall = function() {
    this.y--;
  }

  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r*2);
  }
}
