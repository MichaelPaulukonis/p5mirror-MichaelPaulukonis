function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  background(220, 10);
  
  // Move the origin to the center of the canvas
  translate(width / 2, height / 2);
  
  // Calculate the x and y positions using sin and cos
  let angle = (frameCount * 0.02) // % 3
  let x = cos(angle) * 100;
  let y = sin(angle) * 100;
  
  // Draw the object at the calculated position
  ellipse(x, y, 20, 20);
}
