let colorImg;
let maskImg;
let colorLayer;
let maskLayer

function preload() {
  // Load the color image and the black and white mask image
  colorImg = loadImage('/images/aluminum.xmas.00.jpg');
  maskImg = loadImage('/images/transparent.png');
}

function setup() {
  createCanvas(600, 600);
  background('white')
  colorLayer = createGraphics(600, 600)
  colorLayer.background('purple')
  maskLayer = createGraphics(600, 600)
  maskLayer.image(maskImg, 0, 0, 600, 600)
  maskLayer.drawingContext.globalCompositeOperation = 'source-in'
  maskLayer.image(colorLayer,0 ,0)
}

function draw() {
  background(255);
  image(maskLayer, 0, 0); // Display the masked image
}
