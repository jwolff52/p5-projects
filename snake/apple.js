function Apple() {
  this.x;
  this.y;

  this.show = function() {
    fill(255, 0, 100);
    rect(this.x, this.y, scl, scl);
  }

}
