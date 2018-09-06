function Snake() {
  this.x = width/2;
  this.y = height/2;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.direction = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(food) {
    var d = dist(this.x, this.y, food.x, food.y);
    if (d < 1) {
      this.total++;
      currentFrameRate = map(min(this.total, 100),0,100,minFrameRate,maxFrameRate);
      frameRate(currentFrameRate);
      return true;
    }
    return false;
  }

  this.update = function() {
    this.move();

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.collisionWithSelf()) {
      gameOver();
    }
    this.show();
  }

  this.move = function() {
    this.moveTail();

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;
  }

  this.moveTail = function() {
    if(this.total === this.tail.length) {
      for (var i = 0; i < this.total-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
  }

  this.collisionWithSelf = function() {
    for (var i = 0; i < this.tail.length; i++) {
      if(dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 1) {
        isSelfCollision = true;
      }
    }
    return isSelfCollision;
  }

  this.show = function() {
    fill(255);
    rect(this.x, this.y, 10, 10);
    for (var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }
}
