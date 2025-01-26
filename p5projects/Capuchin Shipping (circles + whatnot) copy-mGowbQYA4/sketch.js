let sketch = (p) => {
  let img;
  let numImages = 5;
  let radius = 250;
  let scaling = 1;
  let trails = false;
  let wobble = true;

  p.preload = () => {
    img = p.loadImage("picasso.jpeg");
  };

  p.setup = () => {
    const canvas = p.createCanvas(600, 600);
    canvas.elt.focus();
    p.angleMode(p.DEGREES);

    let minDimension = p.min(img.width, img.height);
    scaling = p.width / minDimension;
    p.image(img, 0, 0, img.width * scaling, img.height * scaling);
  };

  p.keyPressed = () => {
    if (p.key === "t") trails = !trails;
    if (p.key === "w") wobble = !wobble;
  };

  p.draw = () => {
    numImages = p.map(p.mouseX, 0, p.width, 4, 50);

    if (!trails) {
      p.image(img, 0, 0, img.width * scaling, img.height * scaling);
    }

    p.translate(p.width / 2, p.height / 2);

    // If you want smooth movement, the last item will always be
    // TOO CLOSE to the first item (because it's not a complete integer)
    // using integers gives consistent spacing, but jumpy when adding
    // ... maybe fudge only the LAST element to be halfway between?
    const speed = p.map(p.mouseY, 0, p.height, 1, 100);
    for (let i = 0.5; i < numImages + 0.5; i++) {
      let angle = (p.map(i, 0, numImages, 0, 360) + p.frameCount / 10) % 360;
      let offsetRadius = wobble
        ? -100 + p.noise(0.002 * p.frameCount + i + 1000) * 200
        : 0;
      p.push();
      p.rotate(angle);
      p.translate(0, -radius + offsetRadius);
      p.rotate(720 * p.noise(0.0001 * speed * p.frameCount + i) - 360);
      p.imageMode(p.CENTER);
      p.image(img, 0, 0, 70, 70);
      p.pop();
    }
  };
};

new p5(sketch);
