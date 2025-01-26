var r;
var g;
var b;
var a;

function setup() {
  createCanvas(windowWidth, windowHeight);
  	strokeWeight(2);
}

function draw() {
  background(0, 0, 0);
  
  r = random(255); // r is a random number between 0 - 255
  g = random(100,200); // g is a random number betwen 100 - 200
  b = random(100); // b is a random number between 0 - 100
  a = random(200,255); // a is a random number between 200 - 255
  
let n = 8
let w = width/n
let h = height/n

push();
  translate(w/2,h/2);
  for(let i=0; i<n; i++){
  for(let a=0; a<n; a++){
  push()
  translate(i*w,a*h)
  fill(234, 85, 154);
  ellipse(0,0,sin((frameCount+(i*a))*0.02)*500)
    pop();
 }
  }
  pop();
  
  push();
  translate(w/2,h/2);
  for(let i=0; i<n; i++){
  for(let a=0; a<n; a++){
  push()
  translate(i*w,a*h)
  fill(255, 60, 19);
  ellipse(0,0,sin((frameCount+(i*a))*0.02)*450)
    pop();
 }
  }
  pop();
  
  push();
  translate(w/2,h/2);
  for(let i=0; i<n; i++){
  for(let a=0; a<n; a++){
  push()
  translate(i*w,a*h)
  fill(5, 87, 240);
  ellipse(0,0,sin((frameCount+(i*a))*0.04)*200)
    pop();
 }
  }
  pop();
  
   push();
  translate(w/2,h/2);
  for(let i=0; i<n; i++){
  for(let a=0; a<n; a++){
  push()
  translate(i*w,a*h)
  fill(239, 221, 207);
  ellipse(0,0,sin((frameCount+(i*a))*0.04)*80)
    pop();
 }
  }
  pop();
  
  
     push();
  translate(w/2,h/2);
  for(let i=0; i<n; i++){
  for(let a=0; a<n; a++){
  push()
  translate(i*w,a*h)
  fill(255, 166, 180
);
  ellipse(0,0,sin((frameCount+(i*a))*0.04)*30)
    pop();
 }
  }
  pop();

}




