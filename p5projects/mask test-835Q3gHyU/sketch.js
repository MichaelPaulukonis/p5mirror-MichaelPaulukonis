let mona
let mask

function preload() {
  mona = loadImage('mona.dots.small.fuschia.00.png')
  mask = loadImage('000005.png')
}

function setup() {
  createCanvas(400, 400);
  noLoop()
}

function draw() {
  background(220);
  mona.mask(mask)
  image(mona, 0, 0)
}