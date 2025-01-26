let img;
let pixelation_level = 20;

function preload() {
  img = loadImage("w.jpg"); //https://thispersondoesnotexist.com/
}

function setup() {
  createCanvas(300, 300);
  pixelDensity(1);
  image(img, 0, 0, width, height);
  noStroke();
  redraw()  
}

// TODO: keyboard input, offsets
// turn on / off shapes & overlays
// multiple insets ?
// color averaging of the pixel
// drag-n-drop image

const redraw = () => {
  loadPixels();
  background(0)
  
  const backtrack = Math.round(pixelation_level / 2)
  
  for (let x = 0; x < width + backtrack; x += pixelation_level) {
    for (let y = 0; y < height + backtrack; y += pixelation_level) {
      
      let i = (x + y * width) * 4;

      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      fill(r, g, b, a);
      // leaving BOTH on is.... weird
      // because square and circle are tareting different pixels?
      square(x, y, pixelation_level);
      circle(x - backtrack, y - backtrack, pixelation_level);
    }
  }
}