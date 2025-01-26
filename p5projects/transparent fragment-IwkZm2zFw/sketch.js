let img;
let myShape

function preload() {
  img = loadImage('nancy.00.jpg');
}

function setup() {
  createCanvas(720, 400);
  
  myShape = createGraphics(400, 400);
  myShape.fill(204);
  myShape.quad(189, 18, 216, 18, 216, 360, 144, 360);

  myShape.drawingContext.globalCompositeOperation = 'source-in';
  myShape.image(img, 100, 100)
  
  // noLoop();
}

function draw() {
  clear()
p5  // save()
}
