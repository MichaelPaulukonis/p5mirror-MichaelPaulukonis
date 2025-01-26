// Overlapping color
// Exercises: Overlapping

function setup() {
  createCanvas(400, 400);
  
  noLoop();
}

function draw() {
  background(253);
  
  blendMode(DIFFERENCE);
  noStroke();
  
  let alpha = 255;
  let a = width/3;
  let d = a*1.618; 
  let h = a * sqrt(3.0) / 2.0; 
  let m = (height - (a*2+h))/2;

  //colored circles
  fill(0, 255, 0, alpha);
  ellipse(a*1, m+a, d, d);

  fill(255, 0, 0, alpha);
  ellipse(a*2, m+a, d, d);

  fill(0, 0, 255, alpha);
  ellipse(width/2, m+a+h, d, d);
}