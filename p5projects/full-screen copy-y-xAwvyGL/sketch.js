// Clicking in the box toggles fullscreen on and off.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
  background(mouseX, mouseY, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}