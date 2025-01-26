// from https://github.com/pchhina/kandinsky-circles

function setup() {
  //create a canvas for the robot
  createCanvas(800, 800);
  background(223, 207, 191);
}

function draw() {
  noStroke();
  fill(213, 173, 112, 225);
  beginShape();
  vertex(0, 800);
  vertex(0, 650);
  vertex(750, 0);
  vertex(800, 0);
  vertex(50, 800);
  endShape();

  strokeWeight(1);
  stroke(100, 100, 100);
  fill(230, 176, 174, 150);
  ellipse(380, 230, 125, 125);

  fill(72, 135, 138, 100);
  beginShape();
  vertex(200, 0);
  vertex(300, 0);
  vertex(800, 500);
  vertex(800, 780);
  endShape();

  strokeWeight(1);
  fill(225, 193, 93, 100);
  ellipse(330, 430, 130, 130);

  stroke(100, 100, 100);
  fill(188, 27, 42, 200);
  ellipse(450, 260, 100, 100);

  stroke(100, 100, 100);
  fill(76, 80, 58, 230);
  ellipse(410, 360, 180, 180);

  stroke(100, 100, 100);
  fill(17, 102, 83, 150);
  ellipse(530, 320, 120, 120);

  stroke(0, 0, 0);
  strokeWeight(3);
  fill(216, 82, 51, 175);
  ellipse(400, 310, 60, 60);

  strokeWeight(15);
  point(400, 310)

  // big circle
  stroke(30, 30, 30);
  strokeWeight(30);
  noFill();
  ellipse(400, 390, 700, 700);

  stroke(0, 0, 0);
  strokeWeight(2);
  fill(201, 128, 125);
  ellipse(490, 610, 40, 40);

  strokeWeight(1);
  fill(199, 100, 71);
  ellipse(180, 560, 40, 40);

  strokeWeight(1);
  fill(198, 66, 62);
  ellipse(280, 510, 55, 55);

  strokeWeight(2);
  fill(96, 145, 117);
  ellipse(235, 480, 40, 40);

  strokeWeight(5);
  fill(204, 18, 36);
  ellipse(180, 380, 30, 30);

  strokeWeight(3);
  fill(41, 71, 123);
  ellipse(130, 500, 15, 15);

  strokeWeight(2);
  fill(204, 18, 36);
  ellipse(380, 100, 10, 10);

  strokeWeight(7);
  point(310, 560)

  strokeWeight(1);
  fill(225, 193, 93, 100);
  ellipse(530, 450, 100, 100);

  strokeWeight(2);
  line(250, 650, 550, 150);

  strokeWeight(1);
  line(100, 400, 650, 500);

  strokeWeight(1);
  line(130, 450, 600, 520);

  strokeWeight(1);
  stroke(50);
  line(230, 150, 650, 520);

  strokeWeight(1);
  stroke(100);
  line(600, 150, 530, 620);
  line(580, 160, 510, 600);
  line(570, 160, 500, 590);
  line(570, 530, 470, 580);
  line(560, 520, 460, 570);
  line(560, 505, 450, 560);
  line(200, 600, 330, 570);
  line(220, 580, 330, 600);
  stroke(0);
  line(200, 500, 450, 180);
  stroke(100);
  line(160, 470, 430, 200);
  line(140, 320, 600, 450);
  line(140, 330, 620, 465);
  line(140, 340, 170, 280);
  line(150, 345, 190, 280);

  noStroke();
  fill(112, 67, 84, 230);
  ellipse(550, 220, 70, 70);
  fill(0);
  ellipse(500, 240, 40, 40);
  stroke(10);
  line(250, 145, 630, 280);
}