// use jszip to .... read a zipfile

let interfaceSW = 20;

const activityModes = {
  Display: "display",
  Selecting: "selecting",
  Waiting: "waiting",
};
let activity = activityModes.Waiting;

let context;

// Define a Shape class to hold a collection of Vectors
class Shape {
  constructor(img, vectors = []) {
    this.vectors = vectors;
    this.image = img;
    this.offset = { x: this.image.width / 2, y: this.image.height / 2}
  }

  draw(x,y) {
    strokeWeight(interfaceSW);
    stroke(0);
    noFill();
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x + x - this.offset.x, v.y + y - this.offset.y);
    }
    endShape(CLOSE);
    image(this.image, x, y);
  }
}

let outlineShape = null;

function setup() {
  context = createCanvas(400, 400);
  context.drop(dropFile);
  imageMode(CENTER);
}

function draw() {
  if (activity === activityModes.Display) {
    background(255);
    outlineShape.draw(mouseX, mouseY)
  }
}

function keyTyped() {
  if (key === "r") {
    reset();
  }
}

const getImageVectorKeys = (zip) => {
  let names = Object.keys(zip.files);
  let imageName = names.find((n) => n.endsWith("png"));
  let vectorName = names.find((n) => n.endsWith("json"));
  return { imageName, vectorName };
};

// this is a P5.File wraper, which provides access to underlying File object
async function dropFile(file) {
  // https://stuk.github.io/jszip/documentation/examples/read-local-file-api.html
  if (file.subtype === "zip") {
    const zip = await JSZip.loadAsync(file.file);
    let { imageName, vectorName } = getImageVectorKeys(zip);
    const jsonData = await zip.file(vectorName).async("string");
    let vectors = JSON.parse(jsonData);

    const data = await zip.file(imageName).async("blob");
    var objectURL = URL.createObjectURL(data);
    loadImage(objectURL, (img) => {
      outlineShape = new Shape(img, vectors);
      activity = activityModes.Display;
    });
  } else {
    console.log("Not an image/vector zip file!");
  }
}
