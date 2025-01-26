/* global p5 */

/**

Created by Amazon Q with prompt: If you were to create an exciting p5js visualization, what would it be?

response:

I'd create an interactive particle system that simulates bioluminescent creatures in the deep ocean! Here's a conceptual outline:

This sketch creates an interactive simulation of bioluminescent creatures that:

Pulse with organic-looking glow effects

Are attracted to the mouse cursor when nearby

Have natural-looking movement patterns

Wrap around the canvas edges

Can be added with mouse clicks

Render at high resolution for beautiful saves

The creatures use HSB color mode for better control over the glow effects, and each one has slightly different:

Sizes

Colors (in the blue-cyan range)

Pulse rates

Movement speeds

Attraction to the mouse

The high-resolution rendering ensures the glow effects look smooth even when saved at larger sizes.

You could extend this with:

Different species of creatures

Food particles they chase

Creature interactions

Sound effects

More complex behaviors

Different color patterns

It's a base that could be evolved into many interesting directions while maintaining that mesmerizing, organic feel of deep sea bioluminescence!

**/

const sketch = (p) => {
  let targetLayer;
  let particles = [];
  let showUI = true;
  const targetScale = 2;
  const canvasSize = 600;

  class Creature {
    constructor(x, y) {
      this.position = p.createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(p.random(0.5, 2));
      this.size = p.random(5, 20);
      this.hue = p.random(170, 220); // blue-cyan range
      this.brightness = p.random(80, 100);
      this.pulseRate = p.random(0.02, 0.05);
      this.phase = p.random(p.TWO_PI);
      // Creatures follow mouse when close
      this.perceptionRadius = 200;
      this.maxForce = 0.2;
      this.maxSpeed = 3;
    }

    pulse() {
      // Sinusoidal brightness pulsing
      this.brightness = p.map(p.sin(this.phase), -1, 1, 60, 100);
      this.phase += this.pulseRate;
    }

    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      let d = desired.mag();

      if (d < this.perceptionRadius) {
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
      }
      return p.createVector(0, 0);
    }

    update() {
      // Mouse attraction
      let mousePos = p.createVector(
        p.mouseX * targetScale,
        p.mouseY * targetScale
      );
      let attraction = this.seek(mousePos);
      this.velocity.add(attraction);

      // Random movement
      if (p.frameCount % 30 === 0) {
        this.velocity.add(p5.Vector.random2D().mult(0.5));
      }

      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);

      // Wrap around edges
      this.position.x =
        (this.position.x + targetLayer.width) % targetLayer.width;
      this.position.y =
        (this.position.y + targetLayer.height) % targetLayer.height;

      this.pulse();
    }

    display(graphics) {
      graphics.colorMode(p.HSB, 360, 100, 100, 100);
      graphics.noStroke();

      // Outer glow
      let alpha = 30;
      let size = this.size * 3;
      while (size > this.size) {
        graphics.fill(this.hue, 70, this.brightness, alpha);
        graphics.ellipse(this.position.x, this.position.y, size);
        size *= 0.8;
        alpha += 5;
      }

      // Core
      graphics.fill(this.hue, 40, this.brightness, 90);
      graphics.ellipse(this.position.x, this.position.y, this.size);
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize);
    canvas.position(
      (p.windowWidth - canvasSize) / 2,
      (p.windowHeight - canvasSize) / 2
    );

    targetLayer = p.createGraphics(
      canvasSize * targetScale,
      canvasSize * targetScale
    );

    // Create initial population
    for (let i = 0; i < 50; i++) {
      particles.push(
        new Creature(p.random(targetLayer.width), p.random(targetLayer.height))
      );
    }
  };

  p.draw = () => {
    // Draw to high-res target layer
    targetLayer.background(0, 0, 20); // Deep ocean blue

    particles.forEach((creature) => {
      creature.update();
      creature.display(targetLayer);
    });

    // Scale down and display on main canvas
    p.image(targetLayer, 0, 0, p.width, p.height);

    if (showUI) displayUI();
  };

  p.mousePressed = () => {
    particles.push(new Creature(p.mouseX, p.mouseY));
  };

  p.keyPressed = () => {
    if (p.key === "h") showUI = !showUI;
    if (p.key === "S") targetLayer.save(generateFilename("bioluminescence"));
  };

  function displayUI() {
    const uiText = [
      `Creatures: ${particles.length}`,
      "Click to add creatures",
      "H - Toggle UI",
      "S - Save image",
    ];

    p.fill(0, 150);
    p.noStroke();
    const boxWidth = 200;
    const boxHeight = uiText.length * 20 + 20;
    p.rect(5, p.height - boxHeight - 5, boxWidth, boxHeight, 10);

    p.fill("white");
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    uiText.forEach((text, index) => {
      p.text(text, 10, p.height - boxHeight + 10 + index * 20);
    });
  }

  const timestamp = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const secs = String(d.getSeconds()).padStart(2, "0");
    const millis = String(d.getMilliseconds()).padStart(3, "0");
    return `${year}${month}${day}.${hour}${min}${secs}.${millis}`;
  };

  function generateFilename(prefix) {
    return `${prefix || "mona"}-${timestamp()}.png`;
  }
};

new p5(sketch); // eslint-disable-line no-new, new-cap
