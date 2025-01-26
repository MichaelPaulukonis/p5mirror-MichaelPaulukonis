// inspired by work of https://bsky.app/profile/leedoughty.bsky.social

const palettes = [
  "https://coolors.co/palette/00ffff-00ff15-ffff00-ff9500-ff0040-ff00ff",
  "https://coolors.co/palette/04e762-f5b700-008bf8-89fc00-f4442e",
  "https://coolors.co/palette/ffc759-ff7b9c-607196-babfd1-e8e9ed",
  "https://coolors.co/palette/ffffff-81f4e1-56cbf9-ff729f-d3c4d1",
  "https://coolors.co/palette/cfd4c5-eecfd4-efb9cb-e6adec-c287e8",
  "https://coolors.co/palette/f5ffc6-b4e1ff-ab87ff-fface4-c1ff9b",
];

function setup() {
  createCanvas(400, 400);
  noLoop();
  noStroke();
}

function draw() {
  drawGrid();
}

function keyPressed() {
  drawGrid();
}

function drawGrid() {
  background(255);
  let cols = 4;
  let rows = 4;
  let tileSize = (width / cols) * 0.8; // Reduce tile size to create gaps
  let padding = (width / cols) * 0.2; // Padding to create gaps
  let colors = getColorsFromUrl(random(palettes));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      colors = shuffle(colors, true); // Shuffle the colors array for each tile
      let tileType = random(1);
      if (tileType < 0.2) {
        drawCircleTile(
          i * (tileSize + padding) + padding / 2,
          j * (tileSize + padding) + padding / 2,
          tileSize,
          colors
        );
      } else if (tileType < 0.4) {
        drawSquareTile(
          i * (tileSize + padding) + padding / 2,
          j * (tileSize + padding) + padding / 2,
          tileSize,
          colors
        );
      } else if (tileType < 0.6) {
        drawCrossTile(
          i * (tileSize + padding) + padding / 2,
          j * (tileSize + padding) + padding / 2,
          tileSize,
          colors
        );
      } else if (tileType < 0.8) {
        drawRotatedCrossTile(
          i * (tileSize + padding) + padding / 2,
          j * (tileSize + padding) + padding / 2,
          tileSize,
          colors
        );
      } else {
        drawCircleOfCirclesTile(
          i * (tileSize + padding) + padding / 2,
          j * (tileSize + padding) + padding / 2,
          tileSize,
          colors
        );
      }
    }
  }
}

function drawCircleTile(x, y, size, colors) {
  let numCircles = int(random(2, 5));
  for (let i = numCircles; i > 0; i--) {
    fill(colors[(numCircles - i) % colors.length]);
    ellipse(x + size / 2, y + size / 2, (size * i) / numCircles);
  }
}

function drawSquareTile(x, y, size, colors) {
  let numSquares = int(random(2, 5));
  for (let i = numSquares; i > 0; i--) {
    fill(colors[(numSquares - i) % colors.length]);
    rectMode(CENTER);
    rect(
      x + size / 2,
      y + size / 2,
      (size * i) / numSquares,
      (size * i) / numSquares
    );
  }
}

function drawCrossTile(x, y, size, colors) {
  let barWidth = size / 4;
  blendMode(MULTIPLY);
  fill(colors[0]);
  rectMode(CENTER);
  rect(x + size / 2, y + size / 2, size, barWidth, barWidth / 2); // Horizontal bar
  fill(colors[1]);
  rect(x + size / 2, y + size / 2, barWidth, size, barWidth / 2); // Vertical bar
  blendMode(BLEND); // Reset blend mode to default
}

function drawRotatedCrossTile(x, y, size, colors) {
  let barWidth = size / 4;
  blendMode(MULTIPLY);
  push();
  translate(x + size / 2, y + size / 2);
  rotate(PI / 4);
  fill(colors[0]);
  rect(0, 0, size, barWidth, barWidth / 2); // Horizontal bar
  fill(colors[1]);
  rect(0, 0, barWidth, size, barWidth / 2); // Vertical bar
  pop();
  blendMode(BLEND); // Reset blend mode to default
}

function drawCircleOfCirclesTile(x, y, size, colors) {
  let numSmallCircles = int(random(4, 12));
  let radius = size / 2.9 * map(numSmallCircles, 4, 12, 1, 0.9)
  let angleStep = TWO_PI / numSmallCircles;
  let smallCircleRadius = size / (numSmallCircles / 2); // Size of small circles based on their quantity
  blendMode(MULTIPLY);
  fill(colors[0]);
  ellipse(x + size / 2, y + size / 2, size / 1.2); // Central circle
  fill(colors[1]);
  let rotateChance = random(1) < 0.5;
  if (rotateChance) {
    push();
    translate(x + size / 2, y + size / 2);
    rotate(PI / 4);
    translate(-x - size / 2, -y - size / 2);
  }
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleStep;
    let cx = x + size / 2 + cos(angle) * radius;
    let cy = y + size / 2 + sin(angle) * radius;
    ellipse(cx, cy, smallCircleRadius);
  }
  if (rotateChance) {
    pop();
  }
  blendMode(BLEND); // Reset blend mode to default
}

function getColorsFromUrl(url) {
  let colorStrings = url.split("/").pop().split("-");
  return colorStrings.map((c) => color("#" + c));
}
