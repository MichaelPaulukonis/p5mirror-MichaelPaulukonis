// use jszip to .... read a zipfile

let interfaceSW = 3;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
  Waiting: "waiting",
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

function setup() {
  context = createCanvas(400, 400);
  context.drop(dropFile);
  imageMode(CENTER);
}

function draw() {
  if (activity === activityModes.Display) {
    background(255);
    image(selectionShape.thingy, mouseX, mouseY);
  }
}

function keyTyped() {
  if (key === "r") {
    reset();
  } else if (key === "s") {
    saveIMG();
  }
}

const getTwoNames = (zip) => {
  let names = Object.keys(zip.files);
  let imageName = names.find((n) => n.endsWith("png"));
  let vectorName = names.find((n) => n.endsWith("json"));
  return { imageName, vectorName };
};

// this is a P5.File wraper, which provides access to underlying File object
function dropFile(file) {
  // https://stuk.github.io/jszip/documentation/examples/read-local-file-api.html
  if (file.subtype === "zip") {
    JSZip.loadAsync(file.file).then((zip) => {
      console.log(Object.keys(zip.files));
      let { imageName, vectorName } = getTwoNames(zip);
      selectionShape = new Shape();

      zip.files[imageName].async("blob").then((data) => {
        var objectURL = URL.createObjectURL(data);
        loadImage(objectURL, (img) => {
          selectionShape.thingy = img;
        });
      });

      zip.files[vectorName].async("string").then((data) => {
        let vectors = JSON.parse(data);
        console.log(vectors)
        selectionShape.vectors = vectors
      });
      
      // activity = activityModes.Display;
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
