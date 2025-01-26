let textMask;
let myImage;

function setup() {
  createCanvas(400, 400);

  textMask = createGraphics(400, 400);
  noLoop()
}

function draw() {
  background('cyan');

  // textMask.background('white')
  textMask.fill('rgba(0, 0, 0, 1)');

  textMask.textAlign(CENTER, CENTER)
  textMask.textFont('Georgia')
  textMask.textSize(400)
  textMask.text('f', textMask.width/2, textMask.height/2);

  image(textMask, 0, 0, textMask.width);
}