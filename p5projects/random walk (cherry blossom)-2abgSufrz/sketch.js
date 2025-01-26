// from https://www.skillshare.com/classes/How-to-Code-Creative-Generative-Art-The-Easy-Way-Processing-Basics-for-Beginners/520946096?via=user-profile

var xLocation
var yLocation
var oldDiameter
let colr
var setColor

function setup() {
  createCanvas(700, 700);
  background(255)
  xLocation = random(700)
  yLocation = random(700)
  colr = {
    r: Math.floor(random(255)),
    g: Math.floor(random(255)),
    b: Math.floor(random(255)),
    alpha: Math.floor(random(255))
  }
  setColor = modColor()
  // frameRate(2)
}

const getNewLocs = (oldX, oldY) => {
  let newXLocation = xLocation + random(50) - 25
  let newYLocation = yLocation + random(50) - 25
  const diameter = random(20) + 5;
  const radius = diameter / 2
  if (newXLocation < radius) {
    newXLocation = radius
  }
  if (newXLocation > width - radius) {
    newXLocation = width - radius
  }
  if (newYLocation < radius) {
    newYLocation = radius
  }
  if (newYLocation > height - radius) {
    newYLocation = height - radius
  }
  return {
    newXLocation,
    newYLocation,
    diameter
  }
}

function draw() {
  for (let i = 0; i < 3; i++) {
    let {
      newXLocation,
      newYLocation,
      diameter
    } = getNewLocs(xLocation, yLocation)
    let dist = distance(xLocation, newXLocation, yLocation, newYLocation)
    // this is a lot of nonsense to avoid only the one overlap.....
    while (dist < oldDiameter) {
      let vals = getNewLocs(xLocation, yLocation)
      newXLocation = vals.newXLocation
      newYLocation = vals.newYLocation
      dist = distance(xLocation, newXLocation, yLocation, newYLocation)
    }

    stroke(random(255), 0, random(255), 100)
    line(xLocation, yLocation, newXLocation, newYLocation)
    fill(getColor(colr))
    colr = setColor(colr)
    // fill(0, 100, random(255), 20)
    ellipse(newXLocation, newYLocation, diameter, diameter)

    xLocation = newXLocation
    yLocation = newYLocation
    oldDiameter = diameter
  }
}

const distance = (x1, x2, y1, y2) => {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var distance = sqrt(dx * dx + dy * dy);
  return distance
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
    g = (g + (0.03 * vg))
    b = (b + (0.1 * vb))
    alpha = (alpha + (0.1 * vAlpha)) // this would be better with a vector that reverses
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