let sketch = function (p) {
  let img;
  let paintLayer;
  let isErasing = false;
  let brushSize = 10;
  let scaleRatio;

  p.preload = function () {
    img = p.loadImage("./images/unicum.jpg"); // Load your image here
  };

  p.setup = function () {
    scaleRatio = Math.min(600 / img.width, 600 / img.height);
    p.createCanvas(img.width * scaleRatio, img.height * scaleRatio);
    paintLayer = p.createGraphics(img.width * scaleRatio, img.height * scaleRatio);
    paintLayer.clear();
  };

  p.draw = function () {
    p.background(255);
    p.image(img, 0, 0, img.width * scaleRatio, img.height * scaleRatio);
    p.image(paintLayer, 0, 0);

    // Display UI
    p.fill("blue");
    p.noStroke();
    p.textSize(16);
    p.text(`mode: ${isErasing ? "erase" : "paint"}`, 10, p.height - 30);
    p.text(`brush size: ${brushSize}`, 10, p.height - 10);
  };

  p.mouseDragged = function () {
    paintLayer.stroke(255);
    paintLayer.strokeWeight(brushSize);
    if (isErasing) {
      paintLayer.erase();
    } else {
      paintLayer.noErase();
    }
    paintLayer.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
  };

  p.keyPressed = function () {
    let change = p.keyIsDown(p.SHIFT) ? 1 : 10;
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      brushSize = p.constrain(brushSize + change, 1, 100);
      paintLayer.strokeWeight(brushSize);
      return false;
    } else if (p.keyIsDown(p.LEFT_ARROW)) {
      brushSize = p.constrain(brushSize - change, 1, 100);
      paintLayer.strokeWeight(brushSize);
      return false;
    }

    if (p.key === "e" || p.key === "E") {
      isErasing = !isErasing;
    }

    if ((p.keyIsDown(p.CONTROL) || p.keyIsDown(91)) && p.key === "s") {
      saveCombinedImage();
      return false; // Prevent default browser behavior
    }
  };

  function saveCombinedImage() {
    let combinedImage = p.createGraphics(img.width, img.height);
    combinedImage.image(img, 0, 0, img.width, img.height);
    combinedImage.image(paintLayer, 0, 0, img.width, img.height);
    p.save(combinedImage, generateFilename());
  }

  function generateFilename() {
    let d = new Date();
    return (
      "painted_image." +
      d.getFullYear() +
      "." +
      (d.getMonth() + 1) +
      "." +
      d.getDate() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds() +
      ".png"
    );
  }
};

new p5(sketch);
