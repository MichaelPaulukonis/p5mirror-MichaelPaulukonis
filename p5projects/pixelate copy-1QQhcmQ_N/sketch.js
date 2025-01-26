// Picture: Etty William - Female Nude in a Landscape //
// Wikimedia Commons //

let female;

function preload() {
  female = loadImage("female_nude.jpg");
}

function setup() {
  createCanvas(720, 600);
}

function draw() {
  image(female, 0, 0, width, height);
  noLoop();
}

function mouseDragged () {
  let c = female.get(mouseX,mouseY);
  print(c);
  fill(c);
	noStroke();
  rectMode(CENTER);
  rect(mouseX, mouseY, 20, 20)
}