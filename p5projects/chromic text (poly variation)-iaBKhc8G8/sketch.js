function* cycleString(s) {
  let index = 0;
  while (true) {
    yield s[index];
    index = (index + 1) % s.length; // Loop back to 0 when reaching the end
  }
}

let content = 'This is the season of the witch.'
let iterator = null

const paintText = () => {
      // Determine letter size and color based on mouse position
    let letterSize = map(mouseX, 0, width, 8, 64);
    let letterColor = map(mouseY, 0, height, 0, 255);

    // Rows and columns for the grid
    let cols = 10;
    let rows = 10;

    // Calculate spacing for the grid
    let spacingX = width / cols;
    let spacingY = height / rows;

    // Set the fill color for the letters
    fill(letterColor, 100, 150, 50);

    // Loop to create the grid of letters
    // heh, rows*cols := vertical-first 
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        // Calculate the position for each letter
        let posX = x * spacingX + spacingX / 2;
        let posY = y * spacingY + spacingY / 2;

        // Set the size for each letter
        textSize(letterSize);

        // Draw the letter
        text(iterator.next().value, posX, posY);
      }
    }
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  colorMode(HSB);
  background(220);
  iterator = cycleString(content)
}

function draw() {
  if (mouseIsPressed) {
    paintText()
  }
}

function keyPressed() {
  if (key === ' ') paintText()
}
