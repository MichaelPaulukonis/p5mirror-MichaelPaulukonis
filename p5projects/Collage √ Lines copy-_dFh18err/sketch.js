// originally from https://editor.p5js.org/matamalaortiz/sketches/rkvwg6Jzl

var f01;
var img1, img11, img14, img06, img04, img03, img16;
var h = 500;

function preload() {
  f04 = loadImage('f05.jpg');

  f01 = loadImage('line01.png');
  img1 = loadImage('line02.png');
  img11 = loadImage('line03.png');
  img14 = loadImage('line04.png');
}

function setup() {
  createCanvas(3600, 3800);
  background(240);
  image(f04, 50, 50, 3000, 3650);

  image(f01, 50, 50, 100, 150);

  //image(img1, random(30,300), random(50,450), random(50,200), 150);
  image(img1, random(30, 400), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 400), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 400), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 500), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 500), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 400), random(50, 650), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 400), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 400), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 650), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 400), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 400), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 400), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 450), 140, 100);
  image(img14, random(30, 300), random(50, 650), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  image(img1, random(30, 300), random(50, 450), random(110, 150), 150);
  image(img11, random(30, 300), random(50, 650), 140, 100);
  image(img14, random(30, 300), random(50, 450), 100, 50);
  // filter(INVERT);

  fill(0);
  textFont("Helvetica");
  textAlign(CENTER);
  text("Image made randomly by a p5 Sketch", width / 2, height - 30);
  noLoop()
}

function draw() {
  // saveCanvas('collage', 'jpg');
}