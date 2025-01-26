// from https://p5js.org/examples/color-radial-gradient.html

/*
 * I'm looking to get gradually changing colors for several reasons
 * so playing with things and making notes on noise and color
 *
 * https://forum.processing.org/two/discussion/22551/color-gradients-in-perlin-noise
 * https://genekogan.com/code/p5js-perlin-noise/
 */

/*
 * @name Radial Gradient
 * @description Draws a series of concentric circles to create a gradient
 * from one color to another.
 */
let diameter; // not clear on the variable name, here
const count = 10
let radius;
let circles = []

function setup() {
  createCanvas(710, 400);
  diameter = width / count;
  radius = diameter / 2
  const rows = Math.floor(height / diameter)
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(10);
  for (let r = 1; r <= rows; r++) {
    const y = (diameter * r) - radius
    for (let i = 1; i <= count; i++) {
      circles.push(makeCircle({
        radius,
        x: diameter * i - radius,
        y
      }))
    }
  }
}

function draw() {
  background(0);
  circles.forEach(circle => circle())
}

const hueGetter = (offset = 0, inc = 0.01) => {
  let pc = 0
  let t = inc
  return () => {
    pc += t
    return Math.floor(noise(pc + (offset * 100)) * 360)
  }
}

const makeCircle = ({
  radius,
  x,
  y
}) => {
  const getHue = hueGetter(x+y)
  return () => drawGradient({
    x,
    y,
    radius,
    getHue
  })
}

function drawGradient({
  x,
  y,
  radius,
  getHue
}) {
  let hue = getHue()
  for (let r = radius; r > 0; --r) {
    fill(hue, 90, 90);
    ellipse(x, y, r, r);
    hue = (hue + 1) % 360;
  }
}