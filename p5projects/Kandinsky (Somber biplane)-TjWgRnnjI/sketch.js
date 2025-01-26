// originally from https://github.com/benandjarrys/Exercise_2

function setup() {
  createCanvas(600, 500);
  background(220, 220, 220);
  smooth();
}

function draw() {
  // large red circle
  noStroke();
  fill(255, 99, 71);
  ellipse(100, 100, 200, 200);

  // pink circle
  strokeWeight(1);
  fill(255, 112, 147);
  ellipse(100, 100, 190, 190);

  // sun aura
  fill(255, 215, 0);
  ellipse(170, 170, 85, 85);


  // red sun
  fill(255, 69, 0);
  ellipse(170, 170, 70, 70);

  //black circle  
  fill(0);
  ellipse(100, 100, 160, 160);

  fill(128, 0, 128);
  ellipse(100, 100, 80, 80);

  //big blue triangle
  stroke(0);
  strokeWeight(1);
  fill(176, 224, 230);
  triangle(340, 200, 180, 400, 520, 400);
  // antenna thing
  strokeWeight(1);
  line(340, 110, 340, 250);
  line(315, 120, 410, 160);
  line(325, 175, 365, 175);
  line(330, 185, 375, 185);

  // arc type line
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(300, 195, 100, 100, 0, PI / 2.0);
  // curved line
  noFill();
  strokeWeight(1.5);
  beginShape();
  curveVertex(175, 380);
  curveVertex(175, 380);
  curveVertex(165, 320);
  curveVertex(200, 320);
  curveVertex(250, 330);
  curveVertex(270, 300);
  curveVertex(315, 290);
  curveVertex(350, 305);
  curveVertex(400, 260);
  curveVertex(450, 240);
  curveVertex(480, 240);
  curveVertex(480, 240);
  endShape();

  stroke(0);
  line(155, 350, 470, 250);

}