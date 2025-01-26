// ganked from https://editor.p5js.org/beesandbombs/sketches/BkrDZh89b

function setup() { 
  createCanvas(windowWidth, windowHeight);
  fill(32);
  sp = max(width,height)/N;
  d = sp*.55;
  noStroke();
} 

var v = 6e-5;
var mn = 0.866025404;
var N = 50;
var x, y;
var d = 10, sp = 25;

function grid(){
  for(i=-N; i<N; i++){
    for(j=-N; j<N; j++){
      x = i*sp;
      y = j*mn*sp;
      if(j%2 != 0)
        x += .5*sp;
      ellipse(x,y,d,d);
    }
  }
}

function draw() { 
  background(250);
  push();
  translate(width/2,height/2);
  grid();
  push();
  scale(1.01);
  rotate(v*millis());
  grid();
  pop();
  pop();
  print(frameRate);
}