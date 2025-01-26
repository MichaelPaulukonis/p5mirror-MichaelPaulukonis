// https://www.gorillasun.de/blog/a-guide-to-hexagonal-grids-in-p5js/

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  gridWidth = w;
  gridHeight = w;
  hexagonSize = w / 10;
}

function drawHexagon(cX, cY, r) {
  beginShape();
  for (let a = 0; a < TAU; a += TAU / 6) {
    vertex(cX + r * cos(a), cY + r * sin(a));
  }
  endShape(CLOSE);
}

function makeGrid() {
  let count = 0; // init counter
  for (y = 0; y < gridWidth; y += hexagonSize / 2.3) {
    for (x = 0; x < gridHeight; x += hexagonSize * 1.5) {
      // divide hexagon size by two
      // since we need to pass in the radius and not the diameter
      drawHexagon(
        x + hexagonSize * (count % 2 == 0) * 0.75,
        y,
        hexagonSize / 2
      );
    }
    count++; // increment every row
  }
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  makeGrid();

  noLoop();
}
