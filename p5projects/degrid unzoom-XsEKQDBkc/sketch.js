// 2025.01.04 display image, zoom it down to grid position

function sketch(p) {
  let img;
  let xOffsets = [0, 0, 0];
  let yOffsets = [0, 0, 0];
  let easing = 0.3;
  let dragging = false;
  let dragStart = null; // vector
  let needsRedraw = true;
  let autoSave = false;
  let tileCount = 10 // assuming a square, so both width and height
  
  let targetLayer = null // image w/o UI elements for export (and may be larger than display)
  let gridLayer = null // images than have been zoomed "down"
  let workingLayer = null
  let displaySize = 600
  
  p.preload = function () {
    img = p.loadImage("images/mona.png");
  };

  p.setup = function () {
    p.createCanvas(displaySize, displaySize);
    p.imageMode(p.CENTER)
    img.resize(displaySize, displaySize)
    targetLayer = p.createGraphics(displaySize, displaySize)
    gridLayer = p.createGraphics(displaySize, displaySize)
    workingLayer = p.createGraphics(displaySize, displaySize)
  };

  p.draw = function () {
    p.image(img, p.width / 2, p.height / 2)
  };

}

new p5(sketch);
