// https://stackoverflow.com/a/28416298/41153
// works and adapted to p5js, but onto the main canvas
let img;

function preload() {
  img = loadImage("https://i.sstatic.net/UFBxY.png");
}

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1]; // offset array
  const s = 2; // thickness scale
  const x = 5; // final position
  const y = 5;
  // Draw images at offsets from the array scaled by s
  for (let i = 0; i < dArr.length; i += 2) {
    image(img, x + dArr[i] * s, y + dArr[i + 1] * s);
  }

  // Create a new graphics buffer
  let buffer = createGraphics(width, height);

  // Draw a colored rectangle on the buffer
  buffer.fill(255);
  buffer.rect(0, 0, width, height);

  // Set the blend mode of the canvas to "source-in"
  drawingContext.globalCompositeOperation = "source-in";

  // Draw the buffer on the canvas
  image(buffer, 0, 0);

  // Reset the blend mode of the canvas
  drawingContext.globalCompositeOperation = "source-over";

  // Draw original image in normal mode
  image(img, x, y);
}
