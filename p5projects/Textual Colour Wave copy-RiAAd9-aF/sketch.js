let font

// this allows us to cycle through a text
// but the transitions are still jarring
const t = `more and more sliced out of bounds. More constructed. Monocarpic and then die. An
do what. Actually, are those that he did sleep, but so shortly and more and again. Left
and briefly tells you which additives do what. Actually, do what. Actually,
is equivalent to its own devices, index arbitrage will
become more and fitfully that flower only once and earless
and poetically in religious activities. They you
which additives do what. Actually, constructed. Monocarpic
it harder and again. Left tried again and once and
earless and again. Left index arbitrage will
become more specialized tool industries
developed. It seasonally. More
what. Actually, what they have. We they
have. We is eyeless and harmless. He
engaged more specialized
tool industries developed. It
chart quickly and then
die. An activities. They
and then die. An
own devices,
index
!`.toUpperCase().replace(/\n/g, ' ')

let length = t.length
const windowWidth = 10
let width = length > windowWidth ? windowWidth : length
let index = 0

const wndw = (width, text, length) => (startIndex) => {
  const endIndex = startIndex + width
  let w = t.slice(startIndex, endIndex)
  if (endIndex > length) {
    w += t.slice(0, endIndex - length)
  }
  return w
}

const textWindow = wndw(width, t, length)

function preload() {
  font = loadFont("Franklin Gothic Heavy Italic.ttf")
}

function setup() {
  createCanvas(1000, 1000);
  textSize(30);
  textFont(font);

  textAlign(RIGHT);
  textStyle(BOLD);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  background(0);
  frameRate(4)
}

// a longer blob of text, but there' a slowly moving "window"
// on a portion of the text
// let chars = "0123456789abcdefghijklmnopqrstuvwxyz".toUpperCase()
let chars = `worst enemy of the people`.toUpperCase().replace(/\n/g, ' ')

let min = chars.length
let max = 0
let noiseScale = 0.02

const newVersion = () => {
  let localIndex = Math.floor(index)
  let localText = textWindow(localIndex)
  let prevIndex = -1
  for (let i = -20; i <= 60; i++) {
    for (let j = -20; j <= 60; j++) {
      index = (index + 0.00005) % length
      localIndex = Math.floor(index)
      if (prevIndex !== localIndex) {
        prevIndex = localIndex
        localText = textWindow(localIndex)
      }
      translate(i * 20, j * 20)
      let noiseVal = noise(frameCount * 0.009, i * noiseScale, j * noiseScale);

      // is there a way to combine the textWindow with this?
      // there should be - it's a single character, so would be even simpler....
      // >>AND<< that might allow for the transition to happen character-to-character
      // and not be full-screen, saving a giant jump?
      let ch2 = Math.floor(map(noiseVal, 0.27, .6, 0, localText.length - 1, true))

      let h = map(noiseVal, 0.28, 0.7, 0, 100, true);
      let xo = map(noiseVal, 0, 1, -100, 100);

      fill(h, 100, 100);
      text(localText[ch2], 0 + xo, 0 - sin(frameCount) * 140);
      resetMatrix();
    }
  }
}

const originalVersion = () => {
  for (let i = -20; i <= 60; i++) {
    for (let j = -20; j <= 60; j++) {
      translate(i * 20, j * 20)
      // let noiseVal = noise(i*noiseScale, j*noiseScale, frameCount*0.009);
      let noiseVal = noise(frameCount * 0.009, i * noiseScale, j * noiseScale);

      let ch2 = Math.floor(map(noiseVal, 0.27, .6, 0, chars.length - 1, true))

      let h = map(noiseVal, 0.28, 0.7, 0, 100, true);
      let xo = map(noiseVal, 0, 1, -100, 100);
      //let r = map(noiseVal,0,1,0,360);

      fill(h, 100, 100);
      text(chars[ch2], 0 + xo, 0 - sin(frameCount) * 140);
      resetMatrix();
    }
  }
}

function draw() {
  background(0, 30);
  newVersion()
}