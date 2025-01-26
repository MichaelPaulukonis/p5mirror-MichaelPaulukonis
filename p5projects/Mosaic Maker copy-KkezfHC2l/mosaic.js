// https://editor.p5js.org/jnsjknn/sketches/gKQv1Z_4E
// brightness only

let imgLarge, img, url;
let scl = 10;
let widthinput, heightinput;
let sourceImages = [];
let brightnessValues = [];
let brightImages = [];

function setup() {
  widthinput = createInput("200").attribute('placeholder', 'width')
  heightinput = createInput("200").attribute('placeholder', 'width')
  createP("");
  button = createButton("Create Mosaic");
  reloadbutton = createButton("Reset mosaic");
  createP("");
  reloadbutton.mousePressed(function () {
    location.reload();
  });
  button.mousePressed(go);
  createCanvas(2, 2);
}

function go() {
  button.hide();
  widthinput.hide();
  heightinput.hide();
  let imageID = floor(random(1080));
  url = `https://picsum.photos/id/${imageID}/${widthinput.value()}/${heightinput.value()}`
  createA(url, "original image<br>", "_blank");
  imgLarge = loadImage(url, loadAllImages);
}

function highlight() {
  dropzone.style("background-color", "#ccc");
}

function unhighlight() {
  dropzone.style("background-color", "#fff");
}

function loadAllImages() {
  let srcW = imgLarge.width;
  let srcH = imgLarge.height;
  scl = floor(srcW / 50);
  createCanvas(srcW, srcH);
  background(0);
  button.hide();
  textAlign(CENTER);
  textSize(width / 10);
  stroke(0);
  fill(255);
  text("Loading..", width / 2, height / 2);
  let delayTime = 20;
  let amount = 1084; // max=1084
  for (let i = 0; i < amount; i++) {
    loadImage("https://picsum.photos/20/20?image=" + i, function (src) {
      sourceImages.push(src);
    });
  }
  // this is a potential race condition, since loadImage is asynchronous
  setTimeout(startCreating, 5000);
}

function startCreating() {
  sourceImages = shuffle(sourceImages)
  console.log(sourceImages.length);

  img = createImage(width, height);
  img.copy(
    imgLarge,
    0,
    0,
    imgLarge.width,
    imgLarge.height,
    0,
    0,
    width,
    height
  );

  pixelDensity(1);
  drawMosaic();
}

function drawMosaic() {
  findBrightOnes();
  img.loadPixels();
  for (let x = 0; x < img.width; x += scl) {
    for (let y = 0; y < img.height; y += scl) {
      let pixIndex = 4 * (x + y * img.width);
      let r = img.pixels[pixIndex];
      let g = img.pixels[pixIndex + 1];
      let b = img.pixels[pixIndex + 2];
      let c = color(r, g, b);
      let br = brightness(c);
      let imageIndex = floor(br);
      image(brightImages[imageIndex], x, y, scl, scl);
    }
  }
}

function findBrightOnes() {
  for (let i = 0; i < sourceImages.length; i++) {
    let avg = 0;

    sourceImages[i].loadPixels();

    for (let j = 0; j < sourceImages[i].pixels.length; j++) {
      let c = color(sourceImages[i].pixels[j]);
      let b = brightness(c);
      avg += b;
    }
    avg /= sourceImages[i].pixels.length;

    brightnessValues[i] = avg;
  }

  for (let i = 0; i < 256; i++) {
    let record = 256;
    for (let j = 0; j < 256; j++) {
      let diff = abs(i - brightnessValues[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = sourceImages[j];
      }
    }
  }
}
