// originaly from https://editor.p5js.org/projects/r1obAipr-
var img1;
var img2;
var img3;
var x;
var w;

function setup() {
  createCanvas(600, 600);
  img1 = loadImage('texture.jpg');
  img2 = loadImage('zebra_line.png');
  img3 = loadImage('flower.png');
}

function draw() {
  x = map(mouseY, 0, 500, 0, -250);
  w = map(mouseY, 0, 500, 600, 1000);
  a = map(mouseX, 0, 670, -151, 0);

  background(220);
  image(img1, a, 0);
  image(img2, a, -21);
  image(img3, x + a, 0, w, w);
}