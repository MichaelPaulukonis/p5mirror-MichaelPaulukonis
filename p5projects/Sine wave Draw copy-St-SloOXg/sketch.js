let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background(220);
  
  // sin(frequency) * amplitude
  x = 200 + sin(frameCount / 25) * 100;
  y = 200 + cos(frameCount / 50) * 200;
  
  ellipse(x, y, 50, 50);
  
}