// Load the image
let img;
function preload() {
  img = loadImage('IMG_2024-5-30_0-13-6.png');
}

function setup() {
  createCanvas(400, 400);
  noFill();
  strokeWeight(2);
  strokeCap(ROUND);
  strokeJoin(ROUND);
}

function draw() {
  background(255);

  // Draw the image
  image(img, 0, 0);

  // Get the pixel data of the image
  img.loadPixels();
  const pixels = img.pixels;

  // Define a function to check if a pixel is non-transparent
  const isNonTransparent = (x, y) => {
    const index = (y * img.width + x) * 4;
    return pixels[index + 3] > 0;
  };

  // Use the Marching Squares algorithm to get the outline points
  let outlinePoints = getMarchingSquaresOutline(isNonTransparent)
  // Draw the outline
  stroke(0);
  beginShape();
  for (const [x, y] of outlinePoints) {
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Marching Squares algorithm to get the outline points
function getMarchingSquaresOutline(isNonTransparent, width, height) {
  const points = [];

  let x = 0, y = 0;
  let dx = 1, dy = 0;
  do {
    let index = 0;
    if (x > 0 && y > 0 && isNonTransparent(x - 1, y - 1)) index |= 1;
    if (y > 0 && isNonTransparent(x, y - 1)) index |= 2;
    if (x > 0 && isNonTransparent(x - 1, y)) index |= 4;
    if (isNonTransparent(x, y)) index |= 8;

    if (index === 6) {
      points.push([x - 1, y - 1]);
      dx = -1;
      dy = 0;
    } else if (index === 9) {
      points.push([x - 1, y - 1]);
      dx = 0;
      dy = -1;
    } else {
      points.push([x, y]);
      x += dx;
      y += dy;
    }

    // Check if we've reached the edge of the image
    if (x < 0 || x >= width || y < 0 || y >= height) {
      break;
    }
  } while (x !== 0 || y !== 0);

  return points;
}
