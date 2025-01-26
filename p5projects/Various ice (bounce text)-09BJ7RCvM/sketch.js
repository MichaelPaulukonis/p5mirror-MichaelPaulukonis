// originally from https://www.openprocessing.org/sketch/697177
// translation in-progress 2019.12.08
// think it might derive from https://p5js.org/examples/motion-bouncy-bubbles.html
// or https://www.openprocessing.org/sketch/566703

const sourceText = 'What is new pussycat?'.split('')
var tSize = 36;

let charObjs = []
var charaLim = sourceText.length;
var charIndex;

var spring = 0.1;
var gravity = 0.1;
var friction = -0.9;
var charaCounter = 0
var showLetters = true;

function setup() {
  createCanvas(500, 500);
  textSize(tSize);
  textAlign(CENTER);
  for (var i = 1; i < charaLim + 1; i++) {
    charObjs.push(new Chara(i, i - 1, width / (charaLim + 1) * i, random(height / 2), tSize));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < charObjs.length; i++) {
    const charObj = charObjs[i]
    charObj.collide();
    charObj.move();
    charObj.display();
  }

  if (charObjs.length > charaLim * 2) {
    deleteOne(1);
  }
}

function mousePressed() {
  addOne();
}

function addOne() {
  if (charaCounter >= charaLim) {
    charaCounter = 0;
  }
  charObjs.push(new Chara(charObjs.length + 1, charaCounter, mouseX, mouseY, tSize));
  charaCounter++;
}

function deleteOne(delid) {
  charObjs.splice(delid - 1, 1);
  for (var i = delid - 1; i < charObjs.length; i++) {
    const chara = charObjs[i]
    chara.reOrder();
  }
}

function keyPressed() {
  if (key == ' ') {
    showLetters = !showLetters;
  }
}

// TODO: I made this a function, and didn't use the this stuff
// and totally screwed up with closing over vars
class Chara {
  constructor(id, whichChara, x, y, diameter) {
    this.id = id
    this.whichChara = whichChara
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.diameter = diameter
  }

  collide() {
    for (var i = 0; i < charObjs.length; i++) {
      const other = charObjs[i]
      if (other != this) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        var distance = sqrt(dx * dx + dy * dy);
        var minDist = other.diameter / 4 + this.diameter / 4;
        if (distance < minDist * 8) {
          line(this.x, this.y, other.x, other.y);
        }
        if (distance < minDist) {
          var angle = atan2(dy, dx);
          var targetX = this.x + cos(angle) * minDist;
          var targetY = this.y + sin(angle) * minDist;
          var ax = (targetX - other.x) * spring;
          var ay = (targetY - other.y) * spring;
          this.vx -= ax;
          this.vy -= ay;
          other.vx += ax;
          other.vy += ay;
        }
      } else {
        fill(255);
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    if (showLetters) {
      text(sourceText[this.whichChara], this.x, this.y + this.diameter / 3);
    }
    stroke(255);
  }

  reOrder() {
    this.id -= 1;
  }

}