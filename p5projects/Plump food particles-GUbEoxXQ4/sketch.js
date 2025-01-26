// https://www.skillshare.com/classes/Create-Emergent-Generative-Art-With-JavaScript-and-P5.js/769773192/projects

const nParticles = 50;
const particles = []
const particleSize = 80;
const maxCounter = 150
let lines = []
let bColor = 0
const bgColor = 255

const checkCollisions = () => {
  lines = []
  for (let i = 0; i < nParticles; i++) {
    for (let j = 0; j < nParticles; j++) {
      if (i !== j) {
        const distance = p5.Vector.dist(
          particles[i].position,
          particles[j].position
        )
        if (distance < particleSize) {
          if (particles[i].counter === 0) {
            particles[i].direction.rotate(random())
            particles[i].counter = maxCounter
          }
          if (particles[j].counter === 0) {
            particles[j].direction.rotate(random())
            particles[j].counter = maxCounter
          }
          lines.push(
            [particles[i].position,
              particles[j].position,
              distance
            ]
          )
        }
      }
    }
  }
}

const createParticle = () => {
  const particle = {}
  particle.position = createVector(
    Math.random() * width,
    Math.random() * height
  )
  particle.direction = createVector(
    Math.random(),
    Math.random()
  )
  particle.update = function() {
    this.position.add(this.direction)
    if (this.position.x > width || this.position.x < 0) {
      this.position.x = width / 2
    }
    if (this.position.y > height || this.position.y < 0) {
      this.position.y = height / 2
    }
    if (this.counter > 0) {
      this.counter -= 1
    }
  }
  particle.counter = 0
  return particle
}

function setup() {
  createCanvas(400, 400);
  background(bgColor);
  for (let i = 0; i < nParticles; i++) {
    particles.push(createParticle())
  }
}

function draw() {
  background(bgColor, 40)
  checkCollisions()
  for (let i = 0; i < nParticles; i++) {
    const p = particles[i];
    p.update()
    //ellipse(p.position.x, p.position.y, 10)
  }
  for (let i = 0; i < lines.length; i++) {
    const color = map(lines[i][2], 0, particleSize,
      0, 255)
    stroke(255 - color, 255 - color, bColor, 20)
    line(
      lines[i][0].x, lines[i][0].y,
      lines[i][1].x, lines[i][1].y
    )
  }
  bColor = (bColor + 0.5) % 255
}