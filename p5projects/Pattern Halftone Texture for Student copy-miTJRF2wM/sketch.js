function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(225);

  fill(255, 255, 0, 150);
  halftone();
  translate(20, -20);
  rotate(5);
  fill(255, 0, 255, 150);

  halftone();
  rotate(-10);
  translate(-40, 30);
  fill(0, 255, 255, 150);
  halftone();

  noLoop();
}

function halftone() {
  let distort = random(3, 30);
  let distortMin = random(0, 2);
  for (let x = 0; x < width + 50; x += 15) {
    for (let y = 0; y < height + 50; y += 15) {
      let d = dist(x, y, width / 2, height / 2);
      let diam = map(d, 0, 230, distort, distortMin);
      noStroke();
      // fill (x_);
      ellipse(x, y, diam, diam);
    }
  }
}
