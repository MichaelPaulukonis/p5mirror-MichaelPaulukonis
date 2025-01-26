// https://www.skillshare.com/classes/Radial-Generative-Art-How-to-Easily-Code-Intricate-Circular-Geometric-Designs-With-Processing/1390917982/projects?via=custom-lists

var t = 0

function setup() {
  createCanvas(700, 700);
  background('#fff')
  noFill()
  stroke(0, 40)
  frameRate()
}

function draw() {
  t = frameCount
  circles(t)

}

const circles = (t) => {
  translate(width / 2, height / 2)

  ellipse(sin(t / 50) * t / 10, cos(t / 50) * t / 10, tan(t), tan(t))
}