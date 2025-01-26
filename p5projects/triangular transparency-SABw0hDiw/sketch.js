// ganked from https://schultzschultz.com/stretch/

// Main
var bgColor;
var dragDropCanvas;
var droppedFile;
var imgBuffer;
var imgOriginal;
var imgCopy;

// Specific
var drawing = 0;

var stretchSW = 2.0;
var transition = false;
var transitionRes = 5;
var firefox = false;
var firefoxRes = 4;
var drawTranslation;

// Interface
var grid = 10;
var interfaceColor;
var interfaceSW = 3.0;
var fromP1, fromP2, toP1, toP2;

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
    stroke(interfaceColor);
    noFill();
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);

    beginShape();
    strokeWeight(interfaceSW * 5);

    for (let v of this.vectors) {
      vertex(v.x, v.y);
      point(v.x, v.y);
      point(gridify(mouseX), gridify(mouseY));
    }
    endShape(CLOSE);
  }

  fill() {
    fill("blue");
    beginShape();
    for (let v of this.vectors) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

let shape1 = new Shape();

//--------------------------------------------------

function preload() {
  imgOriginal = loadImage("mona.dots.small.00.png");
  imgBuffer = createImage(1, 1);
  bgColor = color(255);
  interfaceColor = color(0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.backgroundColor = bgColor;
  setupImage();
  dragDropCanvas = createCanvas(windowWidth, windowHeight);
  dragDropCanvas.drop(dropFile);
  imageMode(CENTER);
  if (navigator.userAgent.indexOf("Firefox") != -1) firefox = true;
}

function draw() {
  image(imgCopy, width / 2, height / 2);
  shape1.draw();

  if (drawing >= 2) {
  }

  interface();
}

//--------------------------------------------------

function mousePressed() {
  console.log(`drawing: ${drawing}`);
  if (drawing == 0) {
    if (mouseY < 70 && mouseX > width - 205) {
    } else if (mouseY > height - 90 && mouseX > width - 70) {
    } else {
      fromP1.set(gridify(mouseX), gridify(mouseY));
      shape1 = new Shape();
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      drawing++;
      noCursor();
    }
  } else if (drawing == 2) {
    toP1.set(gridify(mouseX), gridify(mouseY));
    // shape1.addVector(gridify(mouseX), gridify(mouseY));
    noCursor();
  } else if (drawing == 3) {
    toP2.set(gridify(mouseX), gridify(mouseY));
    // shape1.addVector(gridify(mouseX), gridify(mouseY));
    noCursor();
  }
}

function mouseDragged() {
  if (drawing == 1) {
    if (fromP1.x != gridify(mouseX) || fromP1.y != gridify(mouseY)) {
      fromP2.set(gridify(mouseX), gridify(mouseY));
    }
  } else if (drawing == 2) {
    toP2.set(gridify(mouseX), gridify(mouseY));
    drawing++;
  } else if (drawing == 3) {
    toP2.set(gridify(mouseX), gridify(mouseY));
  }
}

// TODO: image-in to retain selected area, clear the rest
// see https://shinerweb.com/examples/crop_round_image/crop-triangle-image.html
function doubleClicked() {
  if (toP1.x == gridify(mouseX) && toP1.y == gridify(mouseY)) {
    toP2.set(gridify(mouseX), gridify(mouseY));
    drawing = 0;
    fromP1 = createVector(0, 0);
    fromP2 = createVector(0, 0);
    toP1 = createVector(0, 0);
    toP2 = createVector(0, 0);
    cursor();
    shape1.fill();
  }
}

function mouseReleased() {
  if (drawing == 1) {
    if (fromP1.x != gridify(mouseX) || fromP1.y != gridify(mouseY)) {
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      drawing++;
    } else {
      drawing = 0;
      cursor();
    }
  } else if (drawing == 2) {
    if (
      (fromP1.x == gridify(mouseX) && fromP1.y == gridify(mouseY)) ||
      (fromP2.x == gridify(mouseX) && fromP2.y == gridify(mouseY))
    ) {
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      drawing = 0;
      cursor();
    }
  } else if (drawing == 3) {
    if (toP2.x == 0 || toP2.y == 0) {
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      toP2.set(toP1.x, toP1.y);
    } else {
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      drawing = 0;
      fromP1 = createVector(0, 0);
      fromP2 = createVector(0, 0);
      toP1 = createVector(0, 0);
      toP2 = createVector(0, 0);
      cursor();
      shape1.addVector(gridify(mouseX), gridify(mouseY));
      shape1.draw();
    }
  }
}

function setStyle(val) {
  if (val == "transition") {
    transition = true;
    document.getElementById("transition").style.opacity = "1.0";
    document.getElementById("transfer").style.opacity = "0.3";
  } else if (val == "transfer") {
    transition = false;
    document.getElementById("transition").style.opacity = "0.3";
    document.getElementById("transfer").style.opacity = "1.0";
  }
}

function gridify(n) {
  var gridified;
  gridified = round(n / grid) * grid;
  return gridified;
}

//--------------------------------------------------

function interface() {
  if (mouseIsPressed || drawing > 0) {
    displayInterface();
  }
}

function displayInterface() {
  strokeJoin(ROUND);
  strokeWeight(interfaceSW);
  stroke(interfaceColor);
  noFill();

  if (mousePressed && drawing == 1) {
    // Line
    line(fromP1.x, fromP1.y, gridify(mouseX), gridify(mouseY));

    // Points
    strokeWeight(interfaceSW * 5);
    point(fromP1.x, fromP1.y);
    point(gridify(mouseX), gridify(mouseY));
  } else if (drawing == 2) {
    // Lines
    line(fromP1.x, fromP1.y, fromP2.x, fromP2.y);
    line(fromP1.x, fromP1.y, gridify(mouseX), gridify(mouseY));
    line(fromP2.x, fromP2.y, gridify(mouseX), gridify(mouseY));

    // Points
    strokeWeight(interfaceSW * 4);
    point(gridify(mouseX), gridify(mouseY));
    noStroke();
  } else if (drawing == 3) {
    // Lines
    line(fromP1.x, fromP1.y, fromP2.x, fromP2.y);
    line(fromP1.x, fromP1.y, toP1.x, toP1.y);
    line(fromP2.x, fromP2.y, gridify(mouseX), gridify(mouseY));
    line(toP1.x, toP1.y, gridify(mouseX), gridify(mouseY));

    // Points
    strokeWeight(interfaceSW * 4);
    point(toP1.x, toP1.y);
    point(gridify(mouseX), gridify(mouseY));
    noStroke();
  }
}

//--------------------------------------------------

function uploadFile() {
  var selectedFile = document.getElementById("file-input");
  var myImageFile = selectedFile.files[0];
  var urlOfImageFile = URL.createObjectURL(myImageFile);
  imgOriginal = loadImage(urlOfImageFile, translateFile);
}

function dropFile(file) {
  droppedFile = file.data;
  imgOriginal = createImg(droppedFile, translateFile);
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
  setupImage();
}

//--------------------------------------------------

function setupImage() {
  resizeImages();
  drawing = 0;
  fromP1 = createVector(0, 0);
  fromP2 = createVector(0, 0);
  toP1 = createVector(0, 0);
  toP2 = createVector(0, 0);
  cursor();
}

function resizeImages() {
  imgCopy = null;
  imgCopy = imgOriginal.get(0, 0, imgOriginal.width, imgOriginal.height);
  var factor = max([
    windowWidth / imgOriginal.width,
    windowHeight / imgOriginal.height,
  ]);
  imgCopy.resize(imgOriginal.width * factor, imgOriginal.height * factor);
  drawTranslation = createVector(
    (imgCopy.width - windowWidth) / 2,
    (imgCopy.height - windowHeight) / 2
  );
}

//--------------------------------------------------

function saveIMG() {
  image(imgCopy, width / 2, height / 2);
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
      ".jpg"
  );
}
