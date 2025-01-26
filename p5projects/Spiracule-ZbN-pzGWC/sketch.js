// https://happycoding.io/examples/processing/for-loops/spiral

function setup() {
  createCanvas(500, 500);

  strokeWeight(4);
  background(32);
  noLoop()
}

function draw() {

  var distance = 0;

  var r = random(256);
  var g = random(256);
  var b = random(256);
  var cChange = 2;
  var distanceChange = 0.001;

  for (var angle = 0; angle < 360 * 100; angle += 0.1) {

    var x = width / 2 + cos(radians(angle)) * distance;
    var y = height / 2 + sin(radians(angle)) * distance;

    r += random(-cChange, cChange);
    r = constrain(r, 0, 256);

    g += random(-cChange, cChange);
    g = constrain(g, 0, 256);

    b += random(-cChange, cChange);
    b = constrain(b, 0, 256);

    stroke(r, g, b);

    point(x, y);

    distance += distanceChange;
  }
}