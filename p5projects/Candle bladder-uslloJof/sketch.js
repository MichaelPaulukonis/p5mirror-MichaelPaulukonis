function setup() {
  createCanvas(400, 400);
  background(0); // Set background color to black
  noFill(); // Don't fill shapes
  stroke(255); // Set stroke color to white
  drawStar(width / 2, height / 2, 50, 100, 11); // Draw a star at the center
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
