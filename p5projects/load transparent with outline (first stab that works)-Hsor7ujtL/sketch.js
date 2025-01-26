// use jszip to .... read a zipfile

let interfaceSW = 3;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
  Waiting: "waiting"
};
let activity = activityModes.Waiting;

let context;

// Define a Shape class to hold a collection of Vectors
class Shape {
  constructor() {
    this.vectors = [];
    this.thingy = null;
  }

  addVector(x, y) {
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
  fill() {
    clear();
    let myShape = createGraphics(400, 400);
    myShape.fill(204);
    myShape.strokeWeight(0);
    myShape.beginShape();
    for (let v of this.vectors) {
      myShape.vertex(v.x, v.y);
    }
    myShape.endShape(CLOSE);
    myShape.drawingContext.globalCompositeOperation = "source-in";

    myShape.image(imgOriginal, 0, 0);
    this.thingy = myShape;
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
  // image(imgOriginal, width / 2, height / 2);
}

function draw() {
  if (activity === activityModes.Selecting) {
    image(imgOriginal, width / 2, height / 2);
    selectionShape.draw();
  } else if (activity === activityModes.Display) {
    background(255)
    image(selectionShape.thingy, mouseX, mouseY);
  }
}

const reset = () => {
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
    selectionShape.fill();
    activity = activityModes.Display;
    cursor();
  } else {
  }
}

function keyTyped() {
  if (key === "r") {
    reset();
  } else if (key === "s") {
    saveIMG();
  }
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

// this is a P5.File wraper, which provides access to underlying File object
function dropFile(file) {
  // https://stuk.github.io/jszip/documentation/examples/read-local-file-api.html
  if (file.subtype === "zip") {
    JSZip.loadAsync(file.file).then((zip) => {
      console.log(Object.keys(zip.files))
      // small funcs to grap png and json
      // if not found/exactly give up on this
      return
      zip.forEach((relativePath, zipEntry) => {
        if (zipEntry.name.endsWith(".png")) {
          // console.log(Object.keys(zipEntry))                    
          zip.files[relativePath].async('blob').then((data) => {
          var objectURL = URL.createObjectURL(data);
          loadImage(objectURL, (img) => {
            selectionShape = new Shape();
            selectionShape.thingy = img
            activity = activityModes.Display;
          });
          })
        } else if (zipEntry.name.endsWith('json')) {
          console.log(zipEntry.name)
        }
      });
    });
  } else if (file.type === "image") {
    loadImage(file.data, (img) => {
      imgOriginal = img;
      translateFile();
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
