// based on code from https://github.com/rogeriopvl/8bit

let direction = 1
let scaleMax = 20
let scaleMin = 0.2
let scale = scaleMin

// no wait, almost got it....
let ampMin = 0.1
let ampMax = 20
let ampDirection = 1
let ampVector = ampMin
let amp = ampMin

let img;

function preload() {
  img = loadImage('assets/taylor_swift.jpg');
}

function setup() {
  pixelDensity(1)
  // console.log(img.width, img.height)
  createCanvas(img.width, img.height);
  noSmooth()
  frameRate(10)
  // noLoop()
}

function draw() {
  // might depend on the image
  // but 0.2 is as low as it'll go with pixelDensity(1)
  // and a 512*768 image
  // scaledW and scaledH both have to be >= 1 
  eightBit(img, scale)
  // const scaledAmp = exp(1.25, amp)
  // console.log(`scale: ${scale} amp: ${amp} scaledAmp: ${scaledAmp}`)
  scale += amp * direction
  if (scale <= scaleMin || scale >= scaleMax) {
    direction *= -1
  }
  scale = constrain(scale, scaleMin, scaleMax)
  amp += ampVector * ampDirection
  console.log(amp, ampVector, ampDirection)
  if (amp <= ampMin || amp >= ampMax) {
    ampDirection *= -1
  }
  amp = constrain(amp, ampMin, ampMax)
}

var eightBit = function(img, scale) {
  const factor = scale * 0.01;
  // console.log(`scale: ${scale} factor: ${factor}`)
  // console.log(`canvas.width: ${canvas.width} canvas.height: ${canvas.height}`)

  var scaledW = canvas.width * factor;
  var scaledH = canvas.height * factor;

  // console.log(`scaledW: ${scaledW} scaledH: ${scaledH}`)

  image(img, 0, 0, scaledW, scaledH);
  copy(0, 0, parseInt(scaledW, 10), parseInt(scaledH, 10), 0, 0, img.width, img.height);
};