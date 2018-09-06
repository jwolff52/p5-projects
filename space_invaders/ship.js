function Ship() {
  this.x = width/2;
  this.y = height-40;
  this.w = 20;
  this.scl = 8;
  this.projectiles = [];

  this.move = function(dir) {
    this.x += (direction * this.scl);

    this.x = constrain(this.x,0,width - this.w);
  }

  this.update = function() {
    this.move();
    this.show();
  }

  this.shoot = function() {
    var projectile = new Projectile();
    projectile.x = this.x;
    projectile.y = this.y;
    this.projectiles.push(projectile);
  }

  this.show = function() {
    for (var i = this.projectiles.length-1; i >= 0; i--) {
      if (this.projectiles[i].isOffScreen) {
        this.projectiles.splice(i, 1);
        // console.log(this.projectiles.length);
      } else {
        this.projectiles[i].update();
      }
    }

    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w);
    // rect(100, 100, 20, 20);
  }
}
