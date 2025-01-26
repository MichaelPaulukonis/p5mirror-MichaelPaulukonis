// from https://www.reddit.com/r/p5js/comments/ucmpki/custom_1bit_dithering/
// see also https://openprocessing.org/sketch/85136/
// https://editor.p5js.org/Scatropolis/sketches/6HnWIKwg9

/**
  TBH: this is less of a "ditherer" than a b&w tilesetter
  // except it doesn't do the complete tile, it does it bit by bit
  // which is ..... slow.
**/

var ditherTemplates;
var dithers;
var currentDither;
var scenes;
var currentScene;
let sluggo;
let pxSize = 5;


function preload() {
  // sluggo = loadImage("dithers/sluggo.mine.png");
  sluggo = loadImage("images/sluggo_is_lit.2x.jpg");
  
  sluggo.loadPixels()
  ditherTemplates = [
    loadImage("dithers/4x28.png"),
    loadImage("dithers/4x36.png"),
    loadImage("dithers/4x68.png"),
    loadImage("dithers/6x42 LINES.png"),
    loadImage("dithers/5x30 CIRCLES.png"),
    loadImage("dithers/5x30 CIRCUITS.png"),
    loadImage("dithers/5x45 DiagLines.png"),
  ];
}

function setup() {
  createCanvas(sluggo.width * pxSize, sluggo.height * pxSize);
  noStroke();

  // Dither setup
  currentDither = 0;
  currentScene = 3;
  scenes = 4;
  dithers = ditherTemplates.map((dt) => new dither(dt));
  noLoop()
}

function draw() {
  background(0); // The darker color
  fill(255); // The lighter color

  const noiseModifier = cos(frameCount / 10);

  for (var x = 0; x < width; x += pxSize) {
    for (var y = 0; y < height; y += pxSize) {
      var colorToSend;

      // these are less "scenes" than algorithms
      switch (currentScene) {
        case 3:
          // from image
          colorToSend = sluggo.get(x / 5, y / 5) // nope!
          break;
          
        case 0:
          // NOISE ANIMATION
          const nval = noise(x / 150, y / 150, noiseModifier) * 256;
          colorToSend = color(nval);
          break;
        case 1:
          // GRADIENT
          colorToSend = color((y / height) * 255);
          break;
        case 2:
          // FOLLOW THE MOUSE
          const gray = dist(mouseX, mouseY, x, y);
          colorToSend = color(gray);
          break;
      }

      const chroma = brightness(colorToSend); // no need to make color, then extract brightness - and then map it inside of dither. Doing too much work, here!

      if (ditherColor(chroma, x / pxSize, y / pxSize)) {
        square(x, y, pxSize);
      }
    }
  }
}

const nextTileset = () => {
  // Cycles through loaded dither templates
  currentDither = (currentDither + 1) % ditherTemplates.length;
};

function mouseClicked() {
  nextTileset();
  draw()
}

function keyPressed() {
  print(keyCode);
  if (keyCode === 87) {
    // Press 'W' for next scene
    currentScene = (currentScene + 1) % scenes;
    draw()
  } else if (keyCode === 78) {
    // Press 'N' for previous scene
    currentScene = (currentScene + scenes - 1) % scenes;
    draw()
  } else if (keyCode === 83) {
    // Press 'S' to save
    save(`dither_${frameCount}.jpg`)
  } else if (keyCode === 80) {
    // Press 'P' to change pixSize
    // eh, no way to make smaller.
    // this is just for testing, anyway
    pxSize++
    draw()
  }
}
