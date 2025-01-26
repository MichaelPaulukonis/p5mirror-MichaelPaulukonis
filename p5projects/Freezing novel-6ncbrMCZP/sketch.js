let colorImg;
let maskImg;

function preload() {
  // Load the color image and the black and white mask image
  colorImg = loadImage('/images/aluminum.xmas.00.jpg');
  maskImg = loadImage('/images/transparent.png');
}

function setup() {
  createCanvas(colorImg.width, colorImg.height);
  colorImg.mask(maskImg); // Apply the mask to the color image
}

function draw() {
  background(255);
  image(colorImg, 0, 0); // Display the masked image
}
