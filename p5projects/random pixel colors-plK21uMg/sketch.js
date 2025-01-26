// originally from http://compform.net/pixels/


function setup() {
  createCanvas(500, 500);
  frameRate(4)
}

let n = 5
let nMax = 20
let nMin = 1
let direction = -1

function draw() {
  background(0);
  n = n + 1 * direction
  if (n >= nMax || n <= nMin) {
    direction = direction * -1
  }
  drawGrid(n);
  // noLoop();
}

const drawGrid = (n) => {
  const img = createImage(n, n);
  img.loadPixels();

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var c = color(random(255), random(255), random(255));
      img.set(x, y, c);
    }
  }

  img.updatePixels();

  noSmooth();
  image(img, 0, 0, width, height);
}