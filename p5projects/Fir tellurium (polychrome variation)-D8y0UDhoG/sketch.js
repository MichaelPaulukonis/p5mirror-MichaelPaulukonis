function* cycleString(s) {
  let index = 0;
  while (true) {
    yield s[index];
    index = (index + 1) % s.length; // Loop back to 0 when reaching the end
  }
}

let content = "This is the season of the witch.";
let iterator = null;
const cols = 10;
const rows = 8;
const cellSize = 60;
let prevMouse;

function setup() {
  createCanvas(800, 600);
  background(255);
  noStroke();
  colorMode(HSB, 360, 100, 100);
  iterator = cycleString(content);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  prevMouse = createVector(0, 0);
}

function draw() {
  if (mouseIsPressed) {
    if (prevMouse.x === 0 && prevMouse.y === 0) {
      prevMouse = createVector(mouseX, mouseY);
    }
    let curMouse = createVector(mouseX, mouseY);
    const distance = Math.round(curMouse.dist(prevMouse));
    if (distance >= 5) paintText();
  }
}

function keyPressed() {
  if (key === " ") paintText();
}
function paintText() {
  background(255);

  let letterSize = map(mouseX, 0, width, 8, 64);
  let letterColor = map(mouseY, 0, height, 255, 0);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Calculate cell position
      const xPos = x * cellSize + cellSize / 2;
      const yPos = y * cellSize + cellSize / 2;

      // Calculate distance from mouse to cell
      const distance = dist(mouseX, mouseY, xPos, yPos);

      // Map distance to size and color
      const diameter = map(distance, 0, width, 10, 60);
      const hue = map(distance, 0, width, 0, 360);

      // Set fill color based on distance
      fill(hue, 80, 100);
      rect(xPos, yPos, diameter, diameter);

      textSize(letterSize);
      fill(360 - hue, 100, 150, 255);
      text(iterator.next().value, xPos, yPos);
    }
  }
}
