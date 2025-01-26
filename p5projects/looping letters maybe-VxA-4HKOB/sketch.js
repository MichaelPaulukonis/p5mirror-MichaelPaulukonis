// https://www.skillshare.com/classes/Radial-Generative-Art-How-to-Easily-Code-Intricate-Circular-Geometric-Designs-With-Processing/1390917982/projects?via=custom-lists

// also drawing [ahem] from https://discourse.processing.org/t/text-reveal-along-a-path/1705/8

let tm = new TextManager(poem);
var ts = [...Array(1000).keys()]
var t = 0;
var circles
var rand1, rand2, rand3
let colr

function setup() {
  // const seed = random(Math.pow(10, 10))
  const seed = 9280066975.740238
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
  // const seed = 9925335864.012459 // good for text, at first...
  console.log(`const seed = ${seed}`)
  randomSeed(seed)
  createCanvas(700, 700);
  background(10)
  strokeWeight(0.5)
  stroke(0, 10)
  // noLoop()
  circles = circler({
    centerX: width / 2,
    centerY: height / 2,
    modColor: modColor()
  })
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
  // frameRate(1)
}

function draw() {
  if (t % 200 === 0) {
    // background(0, 10)
  }
  for (let i = 0; i < 1; i++) {
    t += 10
    circles(t)
  }
}

function keyTyped() {
  if (key === 's') {
    saveFrame('loops.######.png')
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
    r = (r + (0.1 * vr))
    g = (g + (0.5 * vg))
    b = (b + (1 * vb))
    alpha = (alpha + (0.1 * vAlpha))
    vAlpha = (alpha > 200 || alpha <= 20) ? -vAlpha : vAlpha
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
  centerX,
  centerY,
  modColor,
  oldX = -999,
  oldY = -999
}) => (t) => {
  fill(getColor(colr))
  colr = modColor(colr)
  push()
  translate(centerX, centerY)

  // rotate(t / 200)

  let x = sin(t / rand2) * 200
  let y = sin(t / rand3) * 200
  var angle = atan2(y - oldY, x - oldX)
  // console.log(angle)
  if (oldX !== -999) {
    // rotate(angle)
  }

  const w = tm.getChar()
  text(w, x, y)


  pop()
  oldX = x
  oldY = y
}