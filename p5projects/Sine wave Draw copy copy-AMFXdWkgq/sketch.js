let x = 0;
let y = 0;
let t = 0;

function setup() {
  createCanvas(400, 400);
  background('#FFF')
  noFill()
  stroke(0, 40)
  // noLoop()
}

function draw() {
  for (let i = 0; i < 1000; i++) {
    t += 0.01
    // sin(frequency) * amplitude
    x = 200 + (sin(t / 50) * t / 10)
    y = 200 + (cos(t / 50) * t / 10)

    ellipse(x, y, tan(t), tan(t));
    // ellipse(sin(t / 50) * t / 10, cos(t / 50) * t / 10, tan(t), tan(t))

  }

}