// Main
var bgColor;
var dragDropCanvas;
var droppedFile;
var imgBuffer;
var imgOriginal;
var imgCopy;

// Specific
var imgStretch;
var imgStretchActive;
var drawing = 0;
var colorPointsFrom = [];
var colorPointsTo = [];

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


//--------------------------------------------------

function preload() {
  imgOriginal = loadImage('mona.dots.small.00.png');
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
  image(imgCopy, width/2, height/2);
  image(imgStretch, width/2, height/2);

  if (drawing >=2) {
    imgStretchActive.clear();
    drawLines();
    image(imgStretchActive, width/2, height/2);
  }

  interface();
}

//--------------------------------------------------

function mousePressed() {
  console.log(`drawing: ${drawing}`)
  if (drawing == 0) {
    if (mouseY < 70 && mouseX > width-205) {
    } else if (mouseY > height-90 && mouseX > width-70) {
    } else {
      fromP1.set(gridify(mouseX), gridify(mouseY));
      imgStretchActive = createGraphics(imgCopy.width, imgCopy.height);
      imgStretchActive.strokeWeight(stretchSW);
      imgStretchActive.strokeCap(ROUND);
      imgStretchActive.noFill();
      drawing++;
      noCursor();
    }
  } else if (drawing == 2) {
    toP1.set(gridify(mouseX), gridify(mouseY));
    noCursor();
  } else if (drawing == 3) {
    toP2.set(gridify(mouseX), gridify(mouseY));
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
    imgStretchActive = null;
    drawLines();
    drawing = 0;
    fromP1 = createVector(0, 0);
    fromP2 = createVector(0, 0);
    toP1 = createVector(0, 0);
    toP2 = createVector(0, 0);
    cursor();
  }
}

function mouseReleased() {
  if (drawing == 1) {
    if (fromP1.x != gridify(mouseX) || fromP1.y != gridify(mouseY)) {
      drawing++;
    } else {
      imgStretchActive = null;
      drawing = 0;
      cursor();
    }
  } else if (drawing == 2) {
    if ((fromP1.x == gridify(mouseX) && fromP1.y == gridify(mouseY)) || (fromP2.x == gridify(mouseX) && fromP2.y == gridify(mouseY))) {
      drawing = 0;
      cursor();
    }
  } else if (drawing == 3) {
    if (toP2.x == 0 || toP2.y == 0) {
      toP2.set(toP1.x, toP1.y);
    } else {
      imgStretchActive = null;
      drawLines();
      drawing = 0;
      fromP1 = createVector(0, 0);
      fromP2 = createVector(0, 0);
      toP1 = createVector(0, 0);
      toP2 = createVector(0, 0);
      cursor();
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

//--------------------------------------------------

function drawLines() {

  if (drawing == 2) {
    toP1.set(gridify(mouseX), gridify(mouseY));
    toP2.set(gridify(mouseX), gridify(mouseY));
  }

  getColorPoints();

  for (var i=0; i<colorPointsFrom.length; i++) {

    var lerpFrom = p5.Vector.lerp(fromP1, fromP2, (1.0/colorPointsFrom.length)*i);
    var lerpTo = p5.Vector.lerp(toP1, toP2, (1.0/colorPointsFrom.length)*i);

    if (transition) {
      var tempDistance = round(p5.Vector.dist(lerpFrom, lerpTo));
      if (imgStretchActive != null) tempDistance/= transitionRes;
      else if (firefox) tempDistance /= firefoxRes;

      for (var j=0; j<=tempDistance; j++) {

        var tempLerpFactor = (1.0/tempDistance)*j;
        let tempColor = lerpColor(color(colorPointsFrom[i]), color(colorPointsTo[i]), tempLerpFactor);
        var tempPos = p5.Vector.lerp(lerpFrom, lerpTo, tempLerpFactor);

        if (imgStretchActive != null) {
          imgStretchActive.strokeWeight(stretchSW*transitionRes);
          imgStretchActive.stroke(tempColor);
          imgStretchActive.point(tempPos.x+drawTranslation.x, tempPos.y+drawTranslation.y);
        } else {
          if (firefox) imgStretch.strokeWeight(stretchSW*firefoxRes);
          else imgStretch.strokeWeight(stretchSW);
          imgStretch.stroke(tempColor);
          imgStretch.point(tempPos.x+drawTranslation.x, tempPos.y+drawTranslation.y);
        }
      }
    } else {
      if (imgStretchActive != null) {
        if (firefox) imgStretchActive.strokeWeight(stretchSW*firefoxRes);
        else imgStretchActive.strokeWeight(stretchSW);
        imgStretchActive.stroke(colorPointsFrom[i]);
        imgStretchActive.line(lerpFrom.x+drawTranslation.x, lerpFrom.y+drawTranslation.y, lerpTo.x+drawTranslation.x, lerpTo.y+drawTranslation.y);
      } else {
        if (firefox) imgStretch.strokeWeight(stretchSW*firefoxRes);
        else imgStretch.strokeWeight(stretchSW);
        imgStretch.stroke(colorPointsFrom[i]);
        imgStretch.line(lerpFrom.x+drawTranslation.x, lerpFrom.y+drawTranslation.y, lerpTo.x+drawTranslation.x, lerpTo.y+drawTranslation.y);
      }
    }
  }
}

function getColorPoints() {
  var distanceFrom = round(p5.Vector.dist(fromP1, fromP2));
  var distanceTo = round(p5.Vector.dist(toP1, toP2));
  var distance = max(distanceFrom, distanceTo);

  if (transition && imgStretchActive != null) distance /= transitionRes;
  else if (firefox) distance /= firefoxRes;

  colorPointsFrom = [];
  if (transition) colorPointsTo = [];

  for (var i=0; i<distance; i++) {
    var getColor = p5.Vector.lerp(p5.Vector.add(fromP1, drawTranslation), p5.Vector.add(fromP2, drawTranslation), (1.0/distance)*i);
    colorPointsFrom[i] = imgCopy.get(int(getColor.x), int(getColor.y));

    if (transition) {
      var getColorEnd = p5.Vector.lerp(p5.Vector.add(toP1, drawTranslation), p5.Vector.add(toP2, drawTranslation), (1.0/distance)*i);
      colorPointsTo[i] = imgCopy.get(int(getColorEnd.x), int(getColorEnd.y));
    }
  }
}

function gridify(n) {
  var gridified;
  gridified = round(n/grid)*grid;
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
    strokeWeight(interfaceSW*5);
    point(fromP1.x, fromP1.y);
    point(gridify(mouseX), gridify(mouseY));
  } else if (drawing == 2) {

    // Lines
    line(fromP1.x, fromP1.y, fromP2.x, fromP2.y);
    line(fromP1.x, fromP1.y, gridify(mouseX), gridify(mouseY));
    line(fromP2.x, fromP2.y, gridify(mouseX), gridify(mouseY));

    // Points
    strokeWeight(interfaceSW*4);
    point(gridify(mouseX), gridify(mouseY));
    noStroke();
  } else if (drawing == 3) {

    // Lines
    line(fromP1.x, fromP1.y, fromP2.x, fromP2.y);
    line(fromP1.x, fromP1.y, toP1.x, toP1.y);
    line(fromP2.x, fromP2.y, gridify(mouseX), gridify(mouseY));
    line(toP1.x, toP1.y, gridify(mouseX), gridify(mouseY));

    // Points
    strokeWeight(interfaceSW*4);
    point(toP1.x, toP1.y);
    point(gridify(mouseX), gridify(mouseY));
    noStroke();
  }
}

//--------------------------------------------------

function uploadFile() {
  var selectedFile = document.getElementById('file-input');
  var myImageFile = selectedFile.files[0];
  var urlOfImageFile = URL.createObjectURL(myImageFile);
  imgOriginal = loadImage(urlOfImageFile, translateFile);
}

function dropFile(file) {
  droppedFile = file.data;
  imgOriginal = createImg(droppedFile, translateFile);
}

function translateFile() {
  var factor = min([(width/imgOriginal.width), (height/imgOriginal.height)]);
  var tempWidth = int(imgOriginal.width*factor);
  var tempHeight = int(imgOriginal.height*factor);
  image(imgOriginal, width/2, height/2, tempWidth, tempHeight);
  imgBuffer = get((width/2)-(tempWidth)/2, (height/2)-(tempHeight)/2, tempWidth, tempHeight);
  imgOriginal = imgBuffer;
  clear();
  setupImage();
}

//--------------------------------------------------

function setupImage() {
  imgStretch = null;
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
  var factor = max([(windowWidth/imgOriginal.width), (windowHeight/imgOriginal.height)]);
  imgCopy.resize(imgOriginal.width*factor, imgOriginal.height*factor);
  if (imgStretch) {
    var imgStretchTemp = createGraphics(imgCopy.width, imgCopy.height);
    imgStretchTemp.image(imgStretch, 0, 0, imgStretchTemp.width, imgStretchTemp.height);
    imgStretch = imgStretchTemp;
  } else {
    imgStretch = createGraphics(imgCopy.width, imgCopy.height);
    imgStretch.strokeWeight(stretchSW);
    imgStretch.strokeCap(ROUND);
    imgStretch.noFill();
  }
  drawTranslation = createVector((imgCopy.width-windowWidth)/2, (imgCopy.height-windowHeight)/2);
}

//--------------------------------------------------

function saveIMG() {
  image(imgCopy, width/2, height/2);
  image(imgStretch, width/2, height/2);
  save("IMG_" + year() + '-' + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
}
