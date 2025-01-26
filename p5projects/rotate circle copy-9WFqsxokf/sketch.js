let cx = 200
let cy = 200
let d = 180
let ratio = 0.5
let d1 = d * ratio
let angle = 0


function setup() {
  createCanvas(600, 600);
  colorMode(RGB, 100)
}

function draw() {
  background(0);

  noFill()
  for (let i = 0; i < 150; i += 50) {
    for (let j = 0; j < 100; j += 50) {

      let r1 = d / 2
      let x = r1 * cos(angle - i * HALF_PI)
      let y = r1 * sin(angle - j * HALF_PI)
      stroke(i, 250, j)
      strokeWeight(4)
      ellipse(cx + x + i, cy + y + j, d1, d1)


      let r2 = (d1) / 2

      let x1 = r2 * cos(angle * HALF_PI)
      let y1 = r2 * sin(angle * HALF_PI)
      stroke(155, j, 80)
      strokeWeight(12)
      point(cx + x - x1 + i, cy + y - y1 + j)

      stroke(i, 150, 210)
      strokeWeight(20)
      point(cx + x - x1 + i, cy + y + y1 + j)



      angle += 0.001
    }
  }


}