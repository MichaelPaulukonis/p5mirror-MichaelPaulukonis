let spinners = [];

function makeSpinner() {
  let thisDude = {
    x: mouseX,
    y: mouseY,
    speed: random(-0.5, 0.5),
  };
  return thisDude;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < spinners.length; i++) {
    push();
    translate(spinners[i].x, spinners[i].y);
    rotate(frameCount * spinners[i].speed);
    text("stupendous!", 0, 0);
    pop();
  }
}

function mousePressed() {
  spinners.push(makeSpinner());
}
