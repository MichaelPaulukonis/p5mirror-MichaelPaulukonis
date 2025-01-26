// https://medium.com/hackernoon/creative-coding-grids-2e6bcaa07596

/**
  TODO: something to make colorful (animated) letter-grids like this:
  https://www.instagram.com/p/CA3FbZ0nTNg/
  Only with more options
  
  simple pixelation technique: https://github.com/rogeriopvl/8bit/blob/master/8bit.js
  nope. This gives us irregular pixel shapes, not fixed squares
  
  Look at the Vox media thing for draggable image ideas
  https://github.com/MichaelPaulukonis/meme/
  
  TODO:
    - alpha-grid overlay
    - fill whole image with dragged-thing
    - scale image with some key, or UI
    - only drag if scale allows
    - change pixelation params via UI/keys
    - ANIMATE !!!!! (or something)
  
**/

let img
let origin = {
  x: 0,
  y: 0
}
let cvs = {
  width: 400,
  height: 400
}

function preload() {
  img = loadImage('assets/taylor_swift.jpg');
}

function setup() {
  pixelDensity(1)
  console.log(img.width, img.height)
  createCanvas(img.width, img.height);
  noSmooth()
  frameRate(10)
  noLoop()
  noStroke();
  pixelateImageCenter(10)

}

// function draw() {
//   // eightBit(img, 1);
// }

// function mouseClicked() {
//   // origin = { x: 0, y: 0 }
// }

function mousePressed() {
  origin = {
    x: mouseX,
    y: mouseY
  }
}

function mouseReleased() {
  // let diff = {
  //   x: origin.x - movedX,
  //   y: origin.y - movedY
  // }
  let diff = {
    x: Math.abs(origin.x - mouseX),
    y: origin.y - mouseY
  }

  console.log(mouseX, mouseY, origin, JSON.stringify(diff))

  origin = {
    ...diff
  }

  // eightBit(img, 1, {
  //   x: -origin.x,
  //   y: -origin.y
  // });

  if (diff.x > 0) {
    clear()
    pixelateImageCenter(diff.x)
  }

  // prevent default
  return false;
}

var eightBit = function(img, scale, origin) {
  const factor = scale * 0.01;

  // still not square. ugh.
  var scaledW = img.width * factor;
  var scaledH = img.height * factor;

  // this will need to be in an off-canvas buffer
  image(img, 0, 0, scaledW, scaledH);
  // image(img, 0, 0, 10, 10);
  copy(0, 0, parseInt(scaledW, 10), parseInt(scaledH, 10), origin.x, origin.y, img.width, img.height);
};

// average code based on http://stackoverflow.com/a/12408627/41153
// this is likely to fail if xLoc,yLoc is with pixSize of width,height
// but works for what I'm currently doing....
const getColor = (xLoc, yLoc, cellSize) => {
  if (yLoc < 0) {
    yLoc = 0
  }
  if (xLoc < 0) {
    xLoc = 0
  }
  let r = 0,
    b = 0,
    g = 0;
  const pixelCount = cellSize * cellSize

  const allPixels = img.drawingContext.getImageData(xLoc, yLoc, cellSize, cellSize).data
  for (let i = 0; i < allPixels.length; i += 4) {
    r += allPixels[i]
    g += allPixels[i + 1]
    b += allPixels[i + 2]
    // skip alpha
  }

  const averageColor = color(r / pixelCount, g / pixelCount, b / pixelCount);
  return averageColor;
}

// extracted from my pixl8r sketch
// TODO: get it working
const pixelateImageCenter = (pxSize) => {
  // lower-right
  var centerX = width / 2;
  var centerY = height / 2;
  for (var x = centerX; x < width; x += pxSize) {
    for (var y = centerY; y < height; y += pxSize) {
      fill(getColor(x, y, pxSize));
      rect(x, y, pxSize, pxSize);
    }
  }

  // lower-left
  // setting the initial value for x to (centerX - pxSize) didn't seem to work.
  for (var x = centerX; x > 0; x -= pxSize) {
    for (var y = centerY; y < height; y += pxSize) {
      fill(getColor(x - pxSize, y, pxSize));
      rect(x - pxSize, y, pxSize, pxSize);
    }
  }

  // upper-right
  for (var x = centerX; x < width; x += pxSize) {
    for (var y = centerY; y > 0; y -= pxSize) {
      fill(getColor(x, y - pxSize, pxSize));
      rect(x, y - pxSize, pxSize, pxSize);
    }
  }

  // upper-left
  for (var x = centerX; x > 0; x -= pxSize) {
    for (var y = centerY; y > 0; y -= pxSize) {
      fill(getColor(x - pxSize, y - pxSize, pxSize));
      rect(x - pxSize, y - pxSize, pxSize, pxSize);
    }
  }
}