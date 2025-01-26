function setup() {
  createCanvas(200, 200);
  fill(0);
  noStroke()
}

function draw() {
  background(220)
  translate(width/2, height/2);
  rotate(frameCount / 20);

  
  // Top-left quarter circle
  arc(0, 0, 50, 50, PI, PI / -2);

  // stroke(0);
  // Bottom-right quarter circle
  arc(0, 0, 50, 50, 0, PI / 2);
}
