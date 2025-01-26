let img; // To hold the image
let target = { x: 100, y: 100, w: 200, h: 150, dragging: false, resizing: false };

function preload() {
  img = loadImage('hindle.texture.jpg'); // Load your image here
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  
  // Display the image
  image(img, 0, 0, width, height);
  
  // Draw the draggable and resizable rectangle
  drawDraggableRect();
  
  // Populate the rectangle with a grid of text if it's within bounds
  if (mouseX > target.x && mouseX < target.x + target.w && mouseY > target.y && mouseY < target.y + target.h) {
    fillGridWithText();
  }
}

function drawDraggableRect() {
  stroke(0);
  fill(255, 255, 255, 100); // Semi-transparent
  rectMode(CORNER);
  rect(target.x, target.y, target.w, target.h);
}

function fillGridWithText() {
  let gridSize = 20; // Size of the grid
  let textMargin = 5; // Margin to start drawing text inside the rectangle
  let textWidth = 30; // Approximate width of the text, adjust as needed
  let textHeight = 10; // Approximate height of the text, adjust as needed

  for (let x = target.x + textMargin; x < target.x + target.w - textWidth; x += gridSize) {
    for (let y = target.y + textMargin; y < target.y + target.h - textHeight; y += gridSize) {
      fill(0);
      noStroke();
      textSize(10);
      textAlign(LEFT, TOP); // Align text to the top-left for consistent positioning
      text('Text', x, y);
    }
  }
}

function mousePressed() {
  if (mouseX > target.x && mouseX < target.x + target.w && mouseY > target.y && mouseY < target.y + target.h) {
    target.dragging = true;
    target.offsetX = target.x - mouseX;
    target.offsetY = target.y - mouseY;
  }
}

function mouseDragged() {
  if (target.dragging) {
    target.x = mouseX + target.offsetX;
    target.y = mouseY + target.offsetY;
  }
}

function mouseReleased() {
  target.dragging = false;
}

function doubleClicked() {
  if (mouseX > target.x && mouseX < target.x + target.w && mouseY > target.y && mouseY < target.y + target.h) {
    target.resizing = !target.resizing;
    if (target.resizing) {
      // Example resizing logic: increase size by 10%
      target.w *= 1.1;
      target.h *= 1.1;
    }
  }
}