let vertices = [
  { isPInst: true, x: 177, y: 138, z: 0 },
  { isPInst: true, x: 72, y: 353, z: 0 },
  { isPInst: true, x: 340, y: 259, z: 0 },
];
let vectors = [];
let angle = 0;
let offset = null;
let center = null;

function setup() {
  createCanvas(400, 400);
  stroke("black");
  for (const vtx of vertices) {
    vectors.push(createVector(vtx.x, vtx.y));
  }
  center = createVector(0, 0);
  for (let v of vectors) {
    center.add(v);
  }
  center.div(vectors.length);
}

mousePressed = () => {
  offset = mouseX;
  center = createVector(0, 0);
  for (let v of vectors) {
    center.add(v);
  }
  center.div(vectors.length);
};

mouseDragged = () => {
  angle = map(mouseX - offset, 0, width, 0, TWO_PI);
  offset = mouseX;
  // Calculate the center (average position)
  center = createVector(0, 0);
  for (let v of vectors) {
    center.add(v);
  }
  center.div(vectors.length);

  for (let i = 0; i < vectors.length; i++) {
    v = vectors[i];
    let relativePos = p5.Vector.sub(v, center);
    let rotatedPos = relativePos.copy().rotate(angle);
    let updatedVector = p5.Vector.add(rotatedPos, center);
    vectors[i] = updatedVector;
  }
};

function draw() {
  background(255);

  push();
  noFill();
  stroke(0);
  beginShape();
  for (const v of vectors) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
  pop();

  noStroke();
  fill(255, 0, 0);
  if (center) {
    circle(center.x, center.y, 5);
  }
}
