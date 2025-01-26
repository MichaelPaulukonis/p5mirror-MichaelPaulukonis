// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

function Box(theText, x, y, w, h) {
  var options = {
    friction: 0.2,
    restitution: 0.5
  }
  this.theText = theText
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.c = map(theText.length, 0, 20, 0, 255) 
  this.col = color(this.c)
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    textAlign(CENTER, BASELINE)
    strokeWeight(1);
    noStroke()//stroke(255);
    fill(this.col);
    rect(0, 0, this.w, this.h);
    fill("white")
    text(this.theText, 0, 0)
    pop();
  }

}
