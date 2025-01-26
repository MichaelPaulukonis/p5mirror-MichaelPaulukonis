let maskImage;
let confettiGraphics;
let a;
let mouseDirty = true;
let testTempImage;

function preload() {
  testTempImage = loadImage("picasso.jpeg");
}

function setup() {
  createCanvas(400, 400);

  // `the equilateral triangle
  a = width / sqrt(3);

  let maskGraphics = createGraphics(width, height);
  maskGraphics.clear();
  maskGraphics.stroke(255);
  maskGraphics.fill(255);

  // Draw an equilateral triangle centered at the origin
  maskGraphics.triangle(
    0,
    a / sqrt(3),
    -a / 2,
    -a / (2 * sqrt(3)),
    a / 2,
    -a / (2 * sqrt(3))
  );

  maskImage = createImage(width, height);
  maskImage.copy(maskGraphics, 0, 0, width, height, 0, 0, width, height);

  confettiGraphics = createGraphics(width, height);
  confettiGraphics.image(testTempImage, 0, 0, width, height);

  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  if (!mouseDirty) {
    return;
  }
  background(0);
  let img = confettiGraphics.get();
  img.mask(maskImage);
  img = img.get();

  translate(width / 2, height / 2);

  // Draw six triangles to cover the entire canvas
  for (let i = 0; i < 6; i++) {
    push();
    rotate(60 * i);
    image(img, 0, -a / (2 * sqrt(3)));
    pop();
  }

  mouseDirty = false;
}

function mouseMoved() {
  confettiGraphics.image(
    testTempImage,
    mouseX - width / 2,
    mouseY - height / 2,
    width,
    height
  );

  mouseDirty = true;
}
