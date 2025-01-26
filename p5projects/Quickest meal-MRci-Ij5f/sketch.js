// https://www.skillshare.com/classes/Radial-Generative-Art-How-to-Easily-Code-Intricate-Circular-Geometric-Designs-With-Processing/1390917982/projects?via=custom-lists

var t = 0

function setup() {
  createCanvas(700, 700);
  background('#fff')
  noFill()
  stroke(0, 40)
}

function draw() {
  // for (let i = 0; i < 1000; i++) {

    translate(width / 2, height / 2)
    t = frameCount

    ellipse(sin(t / 50) * t/10, cos(t / 50) * t/10, tan(t), tan(t))
  // }
}