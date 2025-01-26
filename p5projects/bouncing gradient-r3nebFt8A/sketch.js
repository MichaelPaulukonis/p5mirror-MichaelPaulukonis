// https://happycoding.io/examples/processing/for-loops/bouncing-gradient

var redX;
var redY;
var redXSpeed;
var redYSpeed;

var greenX;
var greenY;
var greenXSpeed;
var greenYSpeed;

var blueX;
var blueY;
var blueXSpeed;
var blueYSpeed;

function setup() {
  createCanvas(256, 256);
  noSmooth();

  redX = random(width);
  redY = random(height);
  redXSpeed = random(-1, 1);
  redYSpeed = random(-1, 1);

  greenX = random(width);
  greenY = random(height);
  greenXSpeed = random(-1, 1);
  greenYSpeed = random(-1, 1);

  blueX = random(width);
  blueY = random(height);
  blueXSpeed = random(-1, 1);
  blueYSpeed = random(-1, 1);
}

function draw() {

  redX += redXSpeed;
  redY += redYSpeed;
  if (redX < 0 || redX > width) {
    redXSpeed *= -1;
  }
  if (redY < 0 || redY > height) {
    redYSpeed *= -1;
  }

  greenX += greenXSpeed;
  greenY += greenYSpeed;
  if (greenX < 0 || greenX > width) {
    greenXSpeed *= -1;
  }
  if (greenY < 0 || greenY > height) {
    greenYSpeed *= -1;
  }

  blueX += blueXSpeed;
  blueY += blueYSpeed;
  if (blueX < 0 || blueX > width) {
    blueXSpeed *= -1;
  }
  if (blueY < 0 || blueY > height) {
    blueYSpeed *= -1;
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var redDistance = dist(x, y, redX, redY);
      var greenDistance = dist(x, y, greenX, greenY);
      var blueDistance = dist(x, y, blueX, blueY);

      stroke(redDistance, greenDistance, blueDistance);
      point(x, y);
    }
  }
}