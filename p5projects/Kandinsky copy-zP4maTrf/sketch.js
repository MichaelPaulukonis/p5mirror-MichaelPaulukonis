let img;
function preload(){
 img = loadImage('Kandinsky.png');
}

function setup() {
  createCanvas(530, 410);
}

function draw() {
  background(136,mouseX+220,138);//217
  image(img, 0,0);
  stroke(0);
  noStroke();
  noFill();
  push()
  fill(217,57,239,150);
  translate(400,100)
  rotate(PI/4);
  rect(0,0,150,150);
  fill(216,111,89,200);
  ellipse(60, 240, 60,120);
  pop();
  
  fill(204,202,0);
  ellipse(135,190,180,220);
  fill(127,139,239);
  strokeWeight(1);
  stroke(0);
  ellipse(135,200,180,(mouseX+800 )/4);//210
  fill(255,0,85,150);
  noStroke();
  ellipse(135,210,170,190);
  strokeWeight(1);
  stroke(0);
  line(70,5,90,120);//70
  line(35,20,90,120);//35
  line(10,45,90,120);
  line(5,75,90,120);//5
   line(480,160,420,mouseY);//180
   line(480,135,420,180);
  line(455,120,420,180);
  line(430,115,420,180);
 
  line(215,30,170,110);
   line(290,20,200,85);
   line(290,30,210,115);
  fill(73,40,98,150);
  rect(380,35,60,30);
  fill(245,84,95,220);
  rect(460,30,40,50);
  stroke(0);
  strokeWeight(7);
  line(470,30,470,80);
  line(480,30,480,80);//
  line(490,30,490,(mouseX+160)/2);
   line(380,40,440,40)
  line(380,50,440,50);
 line(380,60,440,60)
  
  noStroke();
  fill(79,48,105,150);
  triangle(mouseX/2 +310, 20,310,110,370,90);//310
  fill(228,152,8,150);
  triangle(275,150,325,260,380,210);
  fill(220,207,188,150);
  ellipse(87,215,(mouseX + 200)/6,40);//40
  fill(55,219,120,150);
  triangle(10,260,20,280,100,200);
  ellipse(205,180,60,60);
  fill(228,152,8,150);
  triangle(205,170,250,100,270,110);
  fill(127,157,166,150);
  triangle(130,200,80,330,160,330);
  fill(228,152,8,150);
  
  rect(120,270, 20,60);
  fill(228,152,8,150);
  rect(330,290,20,60,mouseX/6,mouseX/6);
  fill(228,152,8,150);
  rect(350,270,20,60,mouseX/6,mouseX/6);
  fill(79,48,105,150);
  rect(370,250,20,60,mouseX/6,mouseX/6);
  strokeWeight(1);
  stroke(0);
  line(420,320, -mouseX+480,390);//420
  line(420,310,- mouseX+490,380);//420
  line(440,305, -mouseX+490,370);//440
  line(445,295,-mouseX+ 510,370);//445
  line(455,295, -mouseX+515,340);//455
  
  line(420,370, 480,285);
  line(420,370, 500,300);
  line(430,390, 500,300);
  line(470,380, 505,300);
  
   line(350,380, 505,200);
  line(350,380, 500,170);
  
  
}