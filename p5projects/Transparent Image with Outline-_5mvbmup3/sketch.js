// https://stackoverflow.com/a/28416298/41153
// works and adapted to p5js, but onto the main canvas
let img;

function preload() {
  img = loadImage("https://i.sstatic.net/UFBxY.png");
  // img = loadImage("IMG_2024-5-30_20-6-24.png")
}

function setup() {
  createCanvas(img.width + 50, img.height+ 50);
}

function draw() {
  let modified = outlined()
  background("blue")
  imageMode(CENTER)
  image(modified, mouseX, mouseY)
}


const outlined = () => {
  const s = 10; // thickness scale
  const x = 5; // final position
  const y = 5;
  const target = createGraphics(width+2*s, height+2*s);
    const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1]; // offset array

  // Draw images at offsets from the array scaled by s
  for (let i = 0; i < dArr.length; i += 2) {
    target.image(img, x + dArr[i] * s, y + dArr[i + 1] * s);
  }

  // Create a new graphics buffer
  let buffer = createGraphics(width+2*s, height+2*s);

  // Draw a colored rectangle on the buffer
  buffer.fill(0);
  buffer.rect(0, 0, width+2*s, height+2*s);

  // Set the blend mode of the canvas to "source-in"
  target.drawingContext.globalCompositeOperation = "source-in";

  // Draw the buffer on the canvas
  target.image(buffer, 0, 0);

  // Reset the blend mode of the canvas
  target.drawingContext.globalCompositeOperation = "source-over";

  // Draw original image in normal mode
  target.image(img, x, y);
  
  return target
}