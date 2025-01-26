var img

function preload() {
  img = loadImage('foot.png')
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  clear()
  image(img)
}