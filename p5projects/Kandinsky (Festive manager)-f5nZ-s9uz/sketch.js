// originally from https://raw.githubusercontent.com/aiksawyer/kandinskyDraw

function setup() {
  createCanvas(195, 451);
  background(226, 218, 216, 196);
}

function draw() {
  drawArcs();
  drawTopRectangles();
  drawBottomStuff();
  // mouseClicked();
}

///this is part were program draws arcs and circle in the top of the crop
function drawArcs() {
  strokeWeight(1);
  fill(212, 180, 103, 195);
  arc(0, 0, 77, 80, 0, HALF_PI);
  fill(89, 149, 197, 200);
  arc(0, 0, 60, 65, 0, HALF_PI);
  strokeWeight(0);
  fill(178, 59, 27, 240);
  arc(0, 113, 85, 85, 0 - HALF_PI, HALF_PI);
  fill(169, 156, 176, 220);
  arc(0, 110, 80, 80, 0 - HALF_PI, HALF_PI);
  strokeWeight(3);
  fill(231, 231, 231);
  ellipse(125, 40, 63, 63);
}

function drawTopRectangles() {
  strokeWeight(2);
  fill(190, 123, 48);
  triangle(0, 45, 0, 53, 95, 0);
  strokeWeight(1);
  fill(169, 156, 176, 200);
  triangle(0, 43, 0, 20, 15, 38);
  fill(0);
  quad(40, 30, 60, 20, 71, 37, 53, 47);
  quad(59, 62, 80, 50, 89, 70, 70, 81);
  quad(0, 175, 0, 220, 32, 197, 11, 167);
  quad(0, 225, 0, 240, 117, 161, 110, 150);
}

function drawBottomStuff() {
  fill(221, 221, 229);
  rect(77, 260, 40, 40);
  fill(196, 75, 84);
  rect(117, 260, 40, 40);
  fill(215, 170, 163);
  rect(77, 300, 40, 40);
  fill(210, 210, 220);
  rect(117, 300, 40, 40);
  strokeWeight(3);
  line(80, 208, 78, 420);
  line(120, 208, 118, 422);
  line(160, 208, 158, 425);
  line(5, 260, 200, 263);
  line(0, 300, 200, 303);
  line(0, 340, 200, 343);


}



function mouseClicked() {
  print(mouseX, mouseY);
}