function setup() {
 let c = createCanvas(1000, 1200);
  background(255);
  //saveCanvas(c, 'myCanvas', 'jpg');
}

function draw() {
  var r = PI/3;
  //background(30);
  
  drawArc(width/2, height/2, width/4, PI/2+r, 3 * PI / 2+r);
  
}

function drawArc(x, y, w, st, sp){
  noFill();
  strokeWeight(1);
  //52, 76, 235
  stroke(random(50,100), random(50,150), random(200,250));
  //arc(x-50, y+40, w, w, st-PI/2, sp-PI/2);
  arc(x, y, w, w, -st, -sp, CHORD);
  noStroke();
  fill(random(150), 100, random(100,200), 170);
  arc(x, y, w+20, w+20, st, sp, CHORD);
  if (w>130 ){
    
    drawArc(x+x*2, y, w*0.75, st+PI/3, sp+PI/3);
    drawArc(x-x*2, y, w*0.75, st+PI/3, sp+PI/3);
    drawArc(x*1.5, y+w*2, w*0.75, st+PI/3, sp+PI/3);
    drawArc(x/2, y-w*1.2, w*0.75, st+PI/3, sp+PI/3);
    
    //drawArc(x-x*1.2, y-w*2, w*0.75, st, sp);
    
    //rotate(PI/100);
    
    
    noLoop();
  }
  
  // if (w>200) {
  //   drawArc(x+w/4, y-w/2, w*.9, st, sp);
  //   drawArc(x-w, y+w/2, w*0.9, st, sp);
  //   //drawArc(x, y+w/0.5, w*0.75, st-PI/3, sp-PI/3);
  //   //drawArc(x, y-w/0.5, w*0.75, st+PI/3, sp+PI/3);
  // }
}

//
// drawArc(x+x*2, y, w*0.75, st+PI/3, sp+PI/3);
//     drawArc(x-x*2, y, w*0.75, st+PI/3, sp+PI/3);
//     drawArc(x*1.5, y+w*2, w*0.75, st+PI/3, sp+PI/3);
//     drawArc(x/2, y-w*2, w*0.75, st+PI/3, sp+PI/3);


