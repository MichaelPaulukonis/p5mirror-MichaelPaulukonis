// originally from https://genekogan.com/code/p5js-perlin-noise/

let t = 0.01
let xyt = 0.02 // whoah!
let slider

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0.0005, 0.06, xyt, 0.0001);
  slider.position(20, 20);
  noStroke();
  frameRate(30)
  // noLoop()
}

function draw() {
  const xyt = slider.value()
  const cell = 10
  for (var x = 0; x < width; x += cell) {
    for (var y = 0; y < height; y += cell) {
      var c = 255 * noise(xyt * x, xyt * y, t); // xy = 2D + time , doh!
      const f = c <= 128 ? 'black' : 'white'
      fill(f);
      rect(x, y, cell, cell);
    }
  }
  t += 0.01
}