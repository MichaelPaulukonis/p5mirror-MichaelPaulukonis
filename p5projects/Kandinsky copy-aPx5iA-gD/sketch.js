function setup() {
  createCanvas(600,500);
}

function draw() {
  background('yellow');
  fill ('black');
  strokeWeight(5)
  circle (200,275,150,150);
  quad (575,380,580,370,70,70,30,90);
  quad (20,480,25,470,580,260,585,270);
  quad (515,150,530,150,530,320,515,320);
  line(150,0,50,300);
  line(200,10,100,250);
  line(25,500,125,400);
  line(300,450,275,350);
  line(350,475,300,325);
  strokeWeight(2)
  line(550,300,500,400);
  line(555,300,505,400);
  line(560,300,510,400);
}