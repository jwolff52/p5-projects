function Flower() {
  this.x = 100;
  this.y = 100
  this.petals = 5;
  this.scl = 5;
  this.rightSpace = 3;
  this.leftSpace = 5;
  this.moveDown = false;
  this.moveRight = true;
  this.moveLeft = false;
  this.angle = TWO_PI/this.petals
  this.isDestroyed = false;
  this.projectiles = [];

  this.update = function() {
    this.show();
  }

  this.move = function() {
    if (this.moveDown) {
      this.y += this.scl;
      this.moveDown = false;
    } else {
      if (this.moveRight){
        if (this.rightSpace > 0) {
          this.rightSpace--;
          this.leftSpace++;
          this.x += this.scl;
          if (this.rightSpace === 0) {
            this.moveRight = false;
            this.moveLeft = true;
            this.moveDown = true;
          }
        }
      } else if (this.moveLeft) {
        if (this.leftSpace > 0) {
          this.leftSpace--;
          this.rightSpace++;
          this.x -= this.scl;
          if (this.leftSpace === 0) {
           this.moveLeft = false;
           this.moveRight = true;
           this.moveDown = true;
         }
        }
      } else {
        console.log("???");
      }
    }
    if (random(1000) < 4) {
      var projectile = new Projectile();
      projectile.x = this.x;
      projectile.y = this.y;
      projectile.yspeed *= -1;
      this.projectiles.push(projectile);
    }
  }

  this.show = function() {
    if (!this.isDestroyed) {
      for (var i = this.projectiles.length-1; i >= 0; i--) {
        if (this.projectiles[i].isOffScreen) {
          this.projectiles.splice(i, 1);
          // console.log(this.projectiles.length);
        } else {
          this.projectiles[i].update();
        }
      }

      push();
      translate(this.x, this.y);
      fill(255, 255, 0);
      ellipseMode(CORNER);
      for (var i = 0; i < this.petals; i++) {
        rotate(this.angle);
        ellipse(-2, -2, 13, 8);
      }
      pop();



      fill(0);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, 9);
    } else {
      this.projectiles = [];
    }
  }
}
