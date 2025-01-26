// All the paths
let paths = [];
// Are we painting?
let painting = false;
// How long until the next circle
let next = 0;
// Where are we now and where were we?
let current;
let previous;
let px = 0;
let py = 10000;
let t = new TextManager(poem);
const cWidth = 720
const cHeight = 600

function setup() {
  createCanvas(cWidth, cHeight);
  current = createVector(0, 0);
  previous = createVector(0, 0);
  colorMode(HSB);
}

const getPos = () => ({
  x: width * noise(px),
  y: width * noise(py)
})

function draw() {
  background(0);

  // TODO: random on/off
  const pp = random()
  if (pp < 0.05 && !painting) {
    startPainting()
  }
  if (pp < 0.02 && painting) {
    stopPainting()
  }

    // If it's time for a new point
    if (millis() > next && painting) {
      px += 0.01;
      py += 0.01;
      // Grab mouse position      
      // current.x = mouseX;
      // current.y = mouseY;
      const pos = getPos()
      current.x = pos.x
      current.y = pos.y

      // New particle's force is based on mouse movement
      let force = p5.Vector.sub(current, previous);
      force.mult(0.5);

      // Add new particle
      paths[paths.length - 1].add(current, force);

      // Schedule next circle
      next = millis() + random(100);

      // Store mouse values
      previous.x = current.x;
      previous.y = current.y;
    } else {
      px += 0.02;
      py += 0.02;
    }

    // Draw all paths
    for (let i = 0; i < paths.length; i++) {
      paths[i].update();
      paths[i].display();
    }
  }

  function mousePressed() {
    startPainting()
  }

  // Stop
  function mouseReleased() {
    stopPainting()
  }

  // Start it up
  const startPainting = () => {
    next = 0;
    painting = true;
    const pos = getPos()
    previous.x = pos.x
    previous.y = pos.y
    paths.push(new Path({
      x: previous.x,
      y: previous.y
    }));
  }

  // Stop
  const stopPainting = () => {
    painting = false;
  }

  // A Path is a list of particles
  class Path {
    constructor(position) {
      this.particles = [];
      this.hue = random(100);
      this.color = {
        x: map(position.x, 0, cHeight, 0, 255),
        y: map(position.y, 0, cWidth, 0, 255)
      }
      this.sizeChange = random([0.995, 1.005, 0.99, 1.01, 0.995, 1.005, 0.99, 1.01, 0.95, 1.05])
      this.alignment = random([LEFT, RIGHT, CENTER])
    }

    add(position, force) {
      // Add a new particle with a position, force, and hue
      this.particles.push(new Particle(position, force, this.hue, this.color, this.sizeChange, this.alignment));
    }

    // Display plath
    update() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
      }
    }

    // Display plath
    display() {
      // Loop through backwards
      for (let i = this.particles.length - 1; i >= 0; i--) {
        // If we shold remove it
        if (this.particles[i].lifespan <= 0) {
          this.particles.splice(i, 1);
          // Otherwise, display it
        } else {
          this.particles[i].display(this.particles[i + 1]);
        }
      }

    }
  }

  // Particles along the path
  class Particle {
    constructor(position, force, hue, colr, sizeChange, alignment) {
      this.position = createVector(position.x, position.y);
      this.velocity = createVector(force.x, force.y);
      this.drag = 0.95;
      this.sizeChange = sizeChange
      this.lifespan = 150;
      this.text = t.getWord()
      this.color = colr
      this.size = map(hue, 0, 100, 4, 64)
      this.alignment = alignment
    }

    update() {
      // Move it
      this.position.add(this.velocity);
      // Slow it down
      this.velocity.mult(this.drag);
      this.size = this.size / this.sizeChange;
      // Fade it out
      this.lifespan--;
    }

    // Draw particle and connect it with a line
    // Draw a line to another
    display(other) {
      stroke(this.color.x, this.color.y, 100, map(this.lifespan, 0, 255, 0, 1, true));
      fill(this.color.x, this.color.y, 100, map(this.lifespan / 2, 0, 255, 0, 1, true));
      textSize(this.size)
      textAlign(this.alignment)
      text(this.text, this.position.x, this.position.y);
      // If we need to draw a line
      if (other) {
        // line(this.position.x, this.position.y, other.position.x, other.position.y);
      }
    }
  }