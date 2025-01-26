var img1;
var img2;

function preload() {
  // load image
  img1 = loadImage("spark.png");
  img2 = loadImage("gold.png");
  img3 = loadImage("silver.jpg");
  img4 = loadImage("carnival.jpg");
}

function setup() {
  // set canvas size
  createCanvas(800, 800);
}

function draw() {
  //background(img4);
  imageMode(CENTER);
  if (mouseIsPressed) {
    // image(img2, mouseX, mouseY, 25, 25)
    image(img3, mouseX, mouseY, 100, 100);
  }
}
