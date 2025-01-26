let img;
const zoomLevel = 2; // Determines how much the zoomed area is enlarged
const cursorSize = 50; // Size of the cursor box
const canvasWidth = 800;
const canvasHeight = 400;
const divider = canvasWidth / 2; // Divides the canvas into two sections

function preload() {
  img = loadImage('image.jpg'); // Replace with your image path
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  clear();
  // Display the image on the left side
  image(img, 0, 0, divider, canvasHeight);

  // Draw the cursor if the mouse is on the left side
  if (mouseX < divider && mouseX >= 0 && mouseY >= 0 && mouseY <= canvasHeight) {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(mouseX - cursorSize / 2, mouseY - cursorSize / 2, cursorSize, cursorSize);
  }

  // Calculate the zoomed area and display it on the right side if the mouse is on the left side
  if (mouseX < divider && mouseX >= 0 && mouseY >= 0 && mouseY <= canvasHeight) {
    // Calculate the source rectangle to be centered on the cursor
    let srcX = constrain(mouseX - (cursorSize * zoomLevel) / 2, 0, divider - cursorSize);
    let srcY = constrain(mouseY - (cursorSize * zoomLevel) / 2, 0, canvasHeight - cursorSize);
    let srcWidth = cursorSize * zoomLevel;
    let srcHeight = cursorSize * zoomLevel;

    // eh, it is NOT centered on the cursor.
    // Adjust srcX and srcY to ensure the zoomed area is centered on the cursor
    srcX = constrain(mouseX - srcWidth / 2, 0, divider - srcWidth);
    srcY = constrain(mouseY - srcHeight / 2, 0, canvasHeight - srcHeight);

    let zoomedImg = img.get(srcX, srcY, srcWidth, srcHeight);
    // Display the zoomed image on the right side, centered
    image(zoomedImg, divider, 0, divider, canvasHeight);
  }
}