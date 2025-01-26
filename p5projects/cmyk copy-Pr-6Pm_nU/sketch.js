var yellow;
var cyan;
var magenta;
var mov = 10;
let form = 0;

function setup() {
  createCanvas(400, 400);
  //form = int(random(3));
}

function draw() {
  background(255);
  

  for (var x = 5; x < 400; x = x + 60) {
    for (var y = 5; y < 400; y = y + 60) {
      push();
      translate(x, y);
      drawYellow();
      drawCyan();
      drawMagenta();

      pop();
    }
  }
}
  
function drawYellow() {
  blendMode(DIFFERENCE);
  noStroke();
  fill(0, 0, 255);
  ellipse(5, 5, 30, 30);
}

function drawCyan() {
  translate(0, 0);
  rotate(radians(mov));

  if (mouseIsPressed) {
    mov += 0.1;
  }

  noStroke();
  fill(255, 0, 0);
  ellipse(0, 15, 30, 30);
}

function drawMagenta() {
  noStroke();
  fill(0, 255, 0);
  ellipse(13, 15, 30, 30);
}
