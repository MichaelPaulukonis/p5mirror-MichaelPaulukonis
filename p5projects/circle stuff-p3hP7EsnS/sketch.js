// https://www.skillshare.com/classes/Radial-Generative-Art-How-to-Easily-Code-Intricate-Circular-Geometric-Designs-With-Processing/1390917982/projects?via=custom-lists

var ts = [...Array(1000).keys()]
var t = 0;
var circles

function setup() {
  createCanvas(700, 700);
  background('#fff')
  noFill()
  strokeWeight(0.5)
  stroke(0, 10)
  // noLoop()
  circles = circler({
    x: width / 2,
    y: height / 2
  })
}

function draw() {
  for (let i = 0; i < 1000; i++) {
    t += 0.005
    circles(t)
  }
}


const circler = ({
  x,
  y
}) => (t) => {
  push()
  translate(x, y)
  ellipse(sin(t / 50) * t / 9, cos(t / 50) * t / 11, tan(t) * 2, tan(t) * cos(t))
  pop()
}