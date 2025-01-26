function setup() {
  createCanvas(100, 100);

  describe('A gray square divided into quadrants. The cursor image changes when the mouse moves to each quadrant.');
}

function draw() {
  background(200);

  // Divide the canvas into quadrants.
  line(50, 0, 50, 100);
  line(0, 50, 100, 50);

  // Change cursor based on mouse position.
  if (mouseX < 50 && mouseY < 50) {
    cursor(CROSS);
  } else if (mouseX > 50 && mouseY < 50) {
    cursor('progress');
  } else if (mouseX > 50 && mouseY > 50) {
    cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');
  } else {
    cursor('grab');
  }
}