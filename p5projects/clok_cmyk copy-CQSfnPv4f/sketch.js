// https://editor.p5js.org/beesandbombs/sketches/Rx9q8pBSO

function setup() {
  createCanvas(windowWidth, windowHeight);
  r0 = .2*min(width,height);
  noStroke();
  // smooth(8);
  
  dayStart = new Date();
  dayStart.setHours(0,0,0,0);
  
  blendMode(MULTIPLY);
  
  sw = 0.3*r0;

}

var r0 = 150,
  r, th, ff = 1.25;
var tt;
var dayStart;

function ease_(p, g){
  if (p < 0.5) 
    return 0.5 * pow(2*p, g);
  else
    return 1 - 0.5 * pow(2*(1 - p), g);
}

var h;

function ease(g){
  
  h = 3*g*g - 2*g*g*g;
  return .5*h + 1.5*h*h - h*h*h;
}

var time;
var secsTime, minsTime, hoursTime;

var sw;

function draw() {
  blendMode(BLEND);
  background(255);
  blendMode(MULTIPLY);
  today = new Date();
  time = today.getTime() - dayStart;
  
  secsTime = time%(60000)/60000;
  minsTime = time%(3600000)/3600000;
  hoursTime = time%(43200000)/43200000;
  
  push();
  translate(width / 2, height / 2);
  
  
  fill(0,255,255);
  for (i = 0; i < 60; i++) {
    tt = constrain(60*secsTime - i,0,1);
    tt = ease(ease(tt)) - secsTime;
    beginShape(TRIANGLE_STRIP);
    for (j = -2; j <= 2; j++) {
      th = TWO_PI * (i + 1 + j / 4) / 60;
      r = r0 + 2*sw*(th / TWO_PI + tt);
      vertex((r-sw) * sin(th), -(r-sw) * cos(th));
      vertex((r+sw) * sin(th), -(r+sw) * cos(th));
    }
    endShape();
  }
  
  fill(255,0,255);
  for (i = 0; i < 60; i++) {
    tt = constrain(60*minsTime - i,0,1);
    tt = ease(tt); - minsTime;
    beginShape(TRIANGLE_STRIP);
    for (j = -2; j <= 2; j++) {
      th = TWO_PI * (i + 1 + j / 4) / 60;
      r = r0 + 2*sw*(th / TWO_PI + tt);
      vertex((r-sw) * sin(th), -(r-sw) * cos(th));
      vertex((r+sw) * sin(th), -(r+sw) * cos(th));
    }
    endShape();
  }
  
  fill(255,255,0);
  for (i = 0; i < 12; i++) {
    tt = constrain(12*hoursTime - i,0,1);
    tt = ease(tt) - hoursTime;
    beginShape(TRIANGLE_STRIP);
    for (j = -6; j <= 6; j++) {
      th = TWO_PI * (i + 1 + j / 12) / 12;
      r = r0 + 2*sw*(th / TWO_PI + tt);
      vertex((r-sw) * sin(th), -(r-sw) * cos(th));
      vertex((r+sw) * sin(th), -(r+sw) * cos(th));
    }
    endShape();
  }
  
  
  pop();

}