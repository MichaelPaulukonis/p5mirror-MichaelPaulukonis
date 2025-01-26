var rods = [];

function setup() {
  createCanvas(500, 500);
  speed = 0.01;
  t=0;
  p=0;
  for (var j = 0; j < 15; j++) {
    startX = 0;
    startY = 0;
    length = 200-t;
      for (var i = p; i < p+100; i++) {
        rods[i] = new rod(startX, startY, length, speed, 5);
        tempX = startX;
        tempY = startY;
        startX += sq(length * length - tempY * tempY);
        startY += sq(length * length - tempX * tempX);
        speed += 0.0001
      }
    t += 10;
    p += 100;
  }
}

  function draw() {
    translate(width / 2, height / 2);
    background(0);

    for (var i = 0; i < rods.length; i++) {
      rods[i].update();
      rods[i].display();
    }
  }

  function rod(_xStart, _yStart, _length, _speed, _size) {
    this.ang = 0;
    this.update = function() {
      this.ang += _speed;
      this.xEnd = _length * sin(this.ang);
      this.yEnd = _length * cos(this.ang);
    }

    this.display = function() {
      stroke(255);
      strokeWeight(2);
      ellipse(this.xEnd, this.yEnd, _size);
    }
  }