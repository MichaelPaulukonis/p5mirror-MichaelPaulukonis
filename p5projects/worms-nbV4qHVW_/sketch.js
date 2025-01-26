// converted from https://happycoding.io/examples/processing/animation/worms

var heading = 0;
var x = 0;
var y = 0
var speed = 1;
var thickness = 5;

var r = 128;
var g = 128;
var b = 128;

var prevLeftX;
var prevLeftY;
var prevRightX;
var prevRightY;
var thicc
var t = 1

function setup() {
  createCanvas(500, 500);
  noSmooth();
  background(0);
  noStroke();

  thicc = vectorMod({
    value: 5,
    min: 2,
    max: 20
  })
}

function draw() {
  if (frameCount % 5 === 0) {
    background(0, 10);
  }
  for (let i = 0; i < 100; i++) {
    t += 0.01
    heading += sin(radians(t)) * 1.1 + randomGaussian() * 4

    r += random(-10, 10);
    g += random(-10, 10);
    b = constrain(b, 0, 256);

    r = constrain(r, 0, 256);
    g = constrain(g, 0, 256);
    b += random(-10, 10);

    x += cos(radians(heading)) * speed;
    y += sin(radians(heading)) * speed;

    if (x < 0) {
      x = width;
      prevLeftX += width;
      prevRightX += width;
    }
    if (x > width) {
      x = 0;
      prevLeftX -= width;
      prevRightX -= width;
    }

    if (y < 0) {
      y = height;
      prevLeftY += height;
      prevRightY += height;
    }
    if (y > height) {
      y = 0;
      prevLeftY -= height;
      prevRightY -= height;
    }


    var leftX = x + cos(radians(heading - 90)) * thickness;
    var leftY = y + sin(radians(heading - 90)) * thickness;

    var rightX = x + cos(radians(heading + 90)) * thickness;
    var rightY = y + sin(radians(heading + 90)) * thickness;

    fill(r, g, b);

    beginShape();
    vertex(prevLeftX, prevLeftY);
    vertex(leftX, leftY);
    vertex(rightX, rightY);
    vertex(prevRightX, prevRightY);
    endShape(CLOSE);

    prevLeftX = leftX;
    prevLeftY = leftY;
    prevRightX = rightX;
    prevRightY = rightY;
    thickness = thicc()
  }
}

const vectorMod = ({
  value,
  min = 2,
  max = 20
}) => {
  let vector = 1
  let val = value
  return () => {
    val = (val + (0.01 * random() * vector))
    vector = (val <= min || val >= max) ? -vector : vector
    return val
  }
}