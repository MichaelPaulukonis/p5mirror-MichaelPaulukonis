let interfaceSW = 3;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
};
let activity = activityModes.Selecting;

let context

// Define a Shape class to hold a collection of Vectors
class Shape {
  constructor() {
    this.vectors = [];
  }

  addVector(x, y) {
    this.vectors.push(new p5.Vector(x, y));
  }

  draw() {
    strokeJoin(ROUND);
    strokeWeight(interfaceSW);
    stroke(0);
    noFill();
    context.globalCompositeOperation = 'destination-in';
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x, v.y);
    }
    if (activity === activityModes.Selecting) {
      vertex(mouseX, mouseY);
    }
    endShape(CLOSE);

    beginShape();
    strokeWeight(interfaceSW * 5);

    for (let v of this.vectors) {
      point(v.x, v.y);
      point(mouseX, mouseY);
    }
    endShape(CLOSE);
  }

  fill() {
    fill("blue");
    strokeWeight(0);
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

let selectionShape = new Shape();

function preload() {
  imgOriginal = loadImage("mona.dots.small.00.png");
}

function setup() {
  context = createCanvas(400, 400);
  background(220);
  imageMode(CENTER);
  image(imgOriginal, width / 2, height / 2);
  // Create some shapes
  let shape1 = new Shape();
  shape1.addVector(50, 50);
  shape1.addVector(350, 50);
  shape1.addVector(350, 350);
  // shape1.addVector(50, 350);
  shape1.draw();

  let shape2 = new Shape();
  shape2.addVector(120, 100);
  // shape2.addVector(300, 100);
  shape2.addVector(320, 300);
  shape2.addVector(100, 300);
  shape2.fill();
  shape2.draw();
}

function draw() {
  image(imgOriginal, width / 2, height / 2);
  if (activity === activityModes.Selecting) {
    selectionShape.draw();
  } else {
    selectionShape.fill();
  }
}

function mousePressed() {
  selectionShape.addVector(mouseX, mouseY);
}

function doubleClicked() {
  console.log("double");
  selectionShape.addVector(mouseX, mouseY);
  selectionShape.fill();
  activity = activityModes.Display;
}
