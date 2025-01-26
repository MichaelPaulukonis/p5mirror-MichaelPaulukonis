function setup() {
  createCanvas(400, 400);
  background(4, 4, 148);
  
  stroke(255);
  strokeWeight(5);
  noFill();
  setLineDash([15]); //create the dashed line pattern here
  
  rect(200, 200, 100, 100);
  
  setLineDash([10, 10]); //longer stitches
  ellipse(300, 300, 100, 100);
  
  setLineDash([5, 10, 30, 10]); //another dashed line pattern
  line(10, 350, 200, 10);
}

function draw() {
  
}

function setLineDash(list) {
  drawingContext.lineCap = 'butt';
  drawingContext.setLineDash(list);
}