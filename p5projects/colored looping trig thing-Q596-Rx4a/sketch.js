// https://www.skillshare.com/classes/Radial-Generative-Art-How-to-Easily-Code-Intricate-Circular-Geometric-Designs-With-Processing/1390917982/projects?via=custom-lists

var t = 1;
var circles
var rand1, rand2, rand3
let colr

function setup() {
  const seed = random(Math.pow(10, 10))
  // const seed = 9665611183.220728 
  // const seed = 6493551177.166705 
  // seed: 9479782651.001234
  // seed: 5987927658.254819 
  // seed: 7880048690.646844 
  // seed: 654932969.6556083 
  // seed: 5048560282.223735 
  // seed: 1208083455.946438 
  // seed: 8574049706.197262
  // seed: 28833313.97011135
  // seed: 6622848276.261135
  // seed: 9665611183.220728 
  // const seed = 4983103005.075402 // shark egg cases
  // const seed = 1892325026.732853 ~
  // const seed = 1667688813.9308367 // pale (but turns ugly gray eventually)
  // const seed = 7110941805.226616
  console.log(`const seed = ${seed}`)
  randomSeed(seed)
  createCanvas(windowWidth, windowHeight);
  noFill()
  strokeWeight(0.5)
  stroke(0, 10)
  // noLoop()
  // background(250)
  // circles = newCircler()
  init()
  // 487.74420371764495
  // 411.05401355166595
  // 62.399757151958
}

function draw() {
  // background(250, 20)
  for (let i = 0; i < 200; i++) {
    t += 0.1
    circles(t)
  }
}

const newCircler = () => {
  return circler({
    x: width / 2,
    y: height / 2,
    modColor: modColor(),
    drawFunc: random(drawingFuncs)
  })
}

const init = () => {
  circles = newCircler()
  background(250)
  rand1 = random(500)
  rand2 = random(500)
  rand3 = random(500)
  console.log(rand1, rand2, rand3)
  colr = {
    r: Math.floor(random(255)),
    g: Math.floor(random(255)),
    b: Math.floor(random(255)),
    alpha: Math.floor(random(255))
  }
}

function keyTyped() {
  if (key === 'x') {
    console.log(JSON.stringify(colr))
  }
  if (key === 'r') {
    init()
  }
}

const getColor = ({
  r,
  g,
  b,
  alpha = 40
}) => {
  return color(r, g, b, alpha)
}


const modColor = () => {
  let vAlpha = 1
  let vr = 1
  let vg = 1
  let vb = 1
  return ({
    r,
    g,
    b,
    alpha
  }) => {
    r = (r + (0.01 * vr))
    g = (g + (0.05 * vg))
    b = (b + (0.1 * vb))
    alpha = (alpha + (0.01 * vAlpha)) // this would be better with a vector that reverses
    vAlpha = (alpha > 200 || alpha <= 10) ? -vAlpha : vAlpha
    vr = (r > 255 || r < 1) ? -vr : vr
    vg = (g > 255 || g < 1) ? -vg : vg
    vb = (b > 255 || b < 1) ? -vb : vb
    return {
      r,
      g,
      b,
      alpha
    }
  }
}

const circler = ({
  x,
  y,
  modColor,
  drawFunc
}) => (t) => {
  stroke(getColor(colr))
  colr = modColor(colr)
  push()
  translate(x, y)
  rotate(t / 200)
  drawFunc(t)
  pop()
}

const drawingFuncs = [
  (t) => ellipse(sin(t / rand2) * 200, cos(t / rand3) * 200, sin(t / rand2) * 200, cos(t / rand3) * 200),
  (t) => rect(sin(t / rand2) * 200, cos(t / rand3) * 200, cos(t / rand2) * 200, sin(t / rand3) * 200),
  (t) => rect(sin(t / rand2) * 200, cos(t / rand3) * 200, cos(t / rand2) * 200, sin(t / rand3) * 200),
  (t) => ellipse(sin(t / rand2) * 200, cos(t / rand3) * 200, tan(t / rand2) * 200, sin(t / rand3) * 200),
  (t) => line(sin(t / rand2) * 200, cos(t / rand3) * 200, tan(t / rand3) * 200, sin(t / rand2) * 200),
  (t) => ellipse(sin(t / rand1) * 400, cos(t / rand2) * 400, sin(t / rand2) * 200, cos(t / rand1) * 200)
]