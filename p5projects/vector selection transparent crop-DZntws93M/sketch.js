// interface suggested by https://schultzschultz.com/stretch/

let interfaceSW = 3;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
};
let activity = activityModes.Selecting;

let context;

// Define a Shape class to hold a collection of Vectors
class Shape {
  constructor() {
    this.vectors = [];
    this.cutout = null;
  }

  addVector(x, y) {
    console.log(x, y);
    this.vectors.push(new p5.Vector(x, y));
  }

  draw() {
    strokeJoin(ROUND);
    // interfaceSW = global
    strokeWeight(interfaceSW);
    stroke(0);
    noFill();
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x, v.y);
    }
    // global
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

  // better name
  makeCutout() {
    clear();
    let myShape = createGraphics(width, height);
    myShape.fill(204);
    myShape.strokeWeight(0);
    myShape.beginShape();
    for (let v of this.vectors) {
      myShape.vertex(v.x, v.y);
    }
    myShape.endShape(CLOSE);
    myShape.drawingContext.globalCompositeOperation = "source-in";

    myShape.image(imgOriginal, 0, 0);
    var img = createImage(myShape.width, myShape.height);
    img.copy(
      myShape,
      0,
      0,
      myShape.width,
      myShape.height,
      0,
      0,
      myShape.width,
      myShape.height
    );
    this.cutout = img;
  }
}

let selectionShape = new Shape();

function preload() {
  imgOriginal = loadImage("mona.dots.small.00.png");
}

function setup() {
  context = createCanvas(400, 400);
  context.drop(dropFile);
  imageMode(CENTER);
  reset()
}

function draw() {
  if (activity === activityModes.Selecting) {
    image(imgOriginal, width / 2, height / 2);
    selectionShape.draw();
  } else {
    // image(imgOriginal, width / 2, height / 2);
    // selectionShape.draw();
    // clear();
    // image(selectionShape.cutout, width / 2, height / 2);
  }
}

const reset = () => {
  resizeCanvas(imgOriginal.width, imgOriginal.height);
  image(imgOriginal, width / 2, height / 2);
  activity = activityModes.Selecting;
  selectionShape = new Shape();
};

function mousePressed() {
  if (activity === activityModes.Selecting) {
    noCursor();
    selectionShape.addVector(mouseX, mouseY);
  }
}

function doubleClicked() {
  if (activity === activityModes.Selecting) {
    selectionShape.addVector(mouseX, mouseY);
    selectionShape.makeCutout();
    activity = activityModes.Display;
    cursor();
    // something is still wrong with the sizing in here
    const cropped = cropImageVecs(
      selectionShape.cutout,
      selectionShape.vectors
    );
    resizeCanvas(cropped.width, cropped.height);
    clear();
    image(cropped, width / 2, height / 2, cropped.width, cropped.height);
  }
}

function keyTyped() {
  if (key === "r") {
    reset();
  } else if (key === "s") {
    saveIMG();
  }
}

function cropImageVecs(img, vectors) {
  // use the shape vectors to get bounding box
  let left = img.width,
    right = 0,
    top = img.height,
    bottom = 0;
  for (let v of vectors) {
    left = min(left, v.x);
    right = max(right, v.x);
    top = min(top, v.y);
    bottom = max(bottom, v.y);
  }
  // to guard against zero-width/height images?
  // do it right
  console.log (right - left + 1, bottom - top + 1)
  let croppedImg = createImage(right - left + 1, bottom - top + 1);
  croppedImg.copy(
    img,
    left,
    top,
    right - left + 1,
    bottom - top + 1,
    0,
    0,
    croppedImg.width,
    croppedImg.height
  );
  console.log(croppedImg.width, croppedImg.height);
  return croppedImg;
}

function translateFile() {
  var factor = min([width / imgOriginal.width, height / imgOriginal.height]);
  var tempWidth = int(imgOriginal.width * factor);
  var tempHeight = int(imgOriginal.height * factor);
  image(imgOriginal, width / 2, height / 2, tempWidth, tempHeight);
  imgBuffer = get(
    width / 2 - tempWidth / 2,
    height / 2 - tempHeight / 2,
    tempWidth,
    tempHeight
  );
  imgOriginal = imgBuffer;
  clear();
  reset();
}

function dropFile(file) {
  if (file.type === "image") {
    loadImage(file.data, (img) => {
      imgOriginal = img;
      reset();
    });
  } else {
    console.log("Not an image file!");
  }
}

function saveIMG() {
  save(
    "IMG_" +
      year() +
      "-" +
      month() +
      "-" +
      day() +
      "_" +
      hour() +
      "-" +
      minute() +
      "-" +
      second() +
      ".png"
  );
}
