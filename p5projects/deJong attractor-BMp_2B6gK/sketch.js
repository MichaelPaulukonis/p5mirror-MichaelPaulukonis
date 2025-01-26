// form https://www.skillshare.com/classes/Creating-Abstract-Art-With-JavaScript-And-P5.js/1658349438?

let a = 1.4,
  b = -2.1,
  c = 2.8,
  d = -2.5
let x = 1
let y = 1
var aSlider, bSlider, cSlider, dSlider
var oldScaledX = -1
var oldScaledY = -1


function setup() {
  aSlider = createSlider(-3, 3, a, 0.01)
  bSlider = createSlider(-3, 3, b, 0.01)
  cSlider = createSlider(-3, 3, c, 0.01)
  dSlider = createSlider(-3, 3, d, 0.01)
  const myButton = createButton('redraw')
  myButton.mousePressed(() => {
    a = aSlider.value()
    b = bSlider.value()
    c = cSlider.value()
    d = dSlider.value()
    background('white')
  })
  createCanvas(500, 500)
  background('white')
  stroke(150, 50, 20, 50)
}

function draw() {
  for (let i = 0; i < 1000; i++) {
    let oldX = x
    let oldY = y
    x = sin(a * oldY) + cos(b * oldX)
    y = sin(c * oldX) + cos(d * oldY)
    const scaledX = map(x, -2, 2, 0, width)
    const scaledY = map(y, -2, 2, 0, height)
    point(scaledX, scaledY)
  }
}