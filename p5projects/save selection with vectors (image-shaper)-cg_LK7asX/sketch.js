// interface suggested by https://schultzschultz.com/stretch/

let interfaceSW = 3;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
};
let activity = activityModes.Selecting;
let croppedVectors = [];
let context;

// Define a Shape class to hold a collection of Vectors
class Shape {
  constructor() {
    this.vectors = [];
    this.cutout = null;
  }

  addVector(x, y) {
    let newVec = new p5.Vector(x, y);
    if (this.vectors.length === 0 || this.vectors[this.vectors.length - 1].dist(newVec) !== 0) {
      this.vectors.push(newVec);
    }
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
  pixelDensity(1)
  context = createCanvas(400, 400);
  context.drop(dropFile);
  imageMode(CENTER);
  reset();
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
  console.log (imgOriginal.width, imgOriginal.height);
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
    // doh! mousePressed has already fired TWICE, so this is a third time sigh
    selectionShape.addVector(mouseX, mouseY);
    selectionShape.makeCutout();
    activity = activityModes.Display;
    cursor();
    let { croppedImg, croppedVecs } = cropImageVecs(
      selectionShape.cutout,
      selectionShape.vectors
    );
    croppedVectors = croppedVecs;
    resizeCanvas(croppedImg.width, croppedImg.height);
    clear();
    image(
      croppedImg,
      width / 2,
      height / 2,
      croppedImg.width,
      croppedImg.height
    );
  }
}

function keyTyped() {
  if (key === "r") {
    reset();
  } else if (key === "s") {
    download();
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
  let croppedVecs = vectors.map((v) => new p5.Vector(v.x - left, v.y - top));
  return { croppedImg, croppedVecs };
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

// zip containing image plus the vectors
// which should allow us to draw outlines, etc.
const saver = (canvas, vectors, name) => {
  var zip = new JSZip();
  canvas.toBlob((blob) => {
    zip.file(name + ".png", blob);
    zip.file(name + ".json", JSON.stringify(vectors));
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${name}.zip`);
    });
  });
};

function download() {
  const name =
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
    second();
  saver(context.drawingContext.canvas, croppedVectors, name);
  console.log("downloaded " + name);
}

