function Projectile() {
  this.x = 100;
  this.y = 400;
  this.yspeed = -5;
  this.isOffScreen = false;

  this.update = function() {
    this.y += this.yspeed;
    if (this.y < -20 || this.y > height + 20) {
      this.isOffScreen = true;
    }
    // this.y = lerp(this.y, this.y + this.yspeed, 0.5);
    this.show();
  }

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 10);
  }
}
