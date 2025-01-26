/**
   this example aims to show the simplest hello world code possible
   for marching.
*/

function setup() {
  // put setup code here
  createCanvas(500, 500);

  background(0);
  fill(255);
  noStroke();
  ellipse(200, 200, 200, 200);
  ellipse(300, 300, 300, 40);

  loadPixels();
  const d = pixelDensity();

  //construct a 2d numeric array of pixel brightnesses, row by row
  let pixelBrightness = [];
  for (let y = 0; y < height; y++) {
    let xRow = [];
    for (let x = 0; x < width; x++) {
      const i = 4 * d * (y * d * width + x);
      const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
      xRow.push(brightness(color(r, g, b)));
    }
    pixelBrightness.push(xRow);
  }

  //call and draw marching vectors
  stroke(0, 255, 255);
  noFill();
  let lines = marchingSquares(pixelBrightness);
  lines.map(function (a) {
    line(a[0], a[1], a[2], a[3]);
  });
  console.log('done!')
}
