let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture({
    video: {
      width: 1920,
      height: 1080
    },
    audio: false
  });
  capture.hide();
}

function draw() {
  background(255);
  fill(0);
  noStroke();

  capture.loadPixels();
  
  let threshold = map(mouseX, 0, width, 0, 1);
  
  for (let x = 0; x < capture.width; x++) {
    for (let y = 0; y < capture.height; y++) {
      let i = (x + y * capture.width) * 4;
      let r = capture.pixels[i+0];
      let g = capture.pixels[i+1];
      let b = capture.pixels[i+2];
      let a = capture.pixels[i+3];
      
      let pixelColor;
      if ((r / 255) > threshold) {
        pixelColor = 255;
      } else {
        pixelColor = 0;
      }
      
      capture.pixels[i+0] = pixelColor;
      capture.pixels[i+1] = pixelColor;
      capture.pixels[i+2] = pixelColor;
    }
  }
  capture.updatePixels();
  
  push();
  // flip camera horizontally
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, width, height);
  pop();
}

