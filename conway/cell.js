function Cell() {
  this.x = 100;
  this.y = 400;
  this.currentState = false;
  this.nextState = false;

  this.show = function() {
    if (this.currentState)
      fill(255);
    else
      fill(51);

    noStroke();
    rect(this.x, this.y, 5, 5);
  }
}
