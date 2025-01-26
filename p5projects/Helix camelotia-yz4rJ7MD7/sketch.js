let sketch = (p) => {
  let img;
  let tileSize = 100;
  let imgX = 0;
  let imgY = 0;
  let moveSpeed = 2;
  let shape;

  p.preload = () => {
    img = p.loadImage('https://picsum.photos/800'); // Replace with the path to your image
  };

  p.setup = () => {
    p.createCanvas(800, 800);
    p.angleMode(p.DEGREES);
    shape = p.createGraphics(tileSize, tileSize);
    drawTriangleShape();
  };

  p.draw = () => {
    p.background(220);

    for (let y = 0; y < p.height; y += tileSize) {
      for (let x = 0; x < p.width; x += tileSize / 2) {
        p.push();
        p.translate(x + tileSize / 2, y + tileSize / 2);
        if ((x / (tileSize / 2) + y / tileSize) % 2 === 0) {
          drawTriangleTile(false);
        } else {
          drawTriangleTile(true);
        }
        p.pop();
      }
    }

    // Move the source area around inside the image
    imgX += moveSpeed;
    if (imgX > img.width - tileSize || imgX < 0) {
      moveSpeed *= -1;
    }
    imgY += moveSpeed;
    if (imgY > img.height - tileSize || imgY < 0) {
      moveSpeed *= -1;
    }
  };

  function drawTriangleShape() {
    shape.beginShape();
    shape.vertex(tileSize / 2, 0);
    shape.vertex(tileSize, tileSize);
    shape.vertex(0, tileSize);
    shape.endShape(p.CLOSE);
  }

  function drawTriangleTile(inverted) {
    let sx = p.constrain(imgX, 0, img.width - tileSize);
    let sy = p.constrain(imgY, 0, img.height - tileSize);
    let imgPart = img.get(sx, sy, tileSize, tileSize);
    imgPart.mask(shape);
    if (inverted) {
      p.scale(1, -1);
    }
    p.image(imgPart, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
  }
};

new p5(sketch);