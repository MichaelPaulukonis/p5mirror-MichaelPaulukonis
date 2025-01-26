let spinners = [];
let texts = [
  "stupendous!",
  "wonderful",
  "learns some of Oz, Wing after the Diamond",
  "Rabbit on the crops are too afraid",
  "to laugh at once agreed running",
  "too stiff and took the Scarecrow",
  "in It The even with a",
  "long winding cried Peggy",
  "the Potato Blossom shall find no wild grass",
];

function makeSpinner() {
  let thisDude = {
    x: mouseX,
    y: mouseY,
    speed: random(-0.5, 0.5),
    text: random(texts),
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
    text(spinners[i].text, 0, 0);
    pop();
  }
}

function mousePressed() {
  spinners.push(makeSpinner());
}
