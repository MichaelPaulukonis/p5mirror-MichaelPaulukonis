let points = 13;
let pointOffset = 0

function setup() {
  createCanvas(400, 400);
  // noLoop();
}

function draw() {
  background(220);

  let deg = 360 / (points * 2);
  let outdent = mouseX / 2;
  let indent = mouseY / 2;
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i <= points * 2; i++) {
    const x = cos(radians(i * deg)) * (outdent - indent * (i % 2));
    const y = sin(radians(i * deg)) * (outdent - indent * (i % 2));
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  pointOffset = mouseX
}

function mouseDragged() {
  pointOffset = mouseX - pointOffset
  points += pointOffset
  points = points > 3 ? points : 3
  pointOffset = mouseX
}

function mouseReleased() {
  pointOffset = 0
}
