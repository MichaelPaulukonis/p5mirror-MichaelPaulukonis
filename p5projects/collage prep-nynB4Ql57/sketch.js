// originally from https://editor.p5js.org/matamalaortiz/sketches/HkjtOQ5fl
// It's not a real mask, but it points towards some ideas
// drag-n-drop image, draw a mask over it, export w/ transparent area (can we do that? eh, work on it)
function setup() {
  createCanvas(1024, 1234);
  background(0);
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(createMask);
}

function draw() {
  fill(255);
  noStroke();

}

function mouseDragged() {
  ellipse(mouseX, mouseY, 180, 180);
  // prevent default
  return false;
}

function createMask() {
  saveCanvas('drawin' + day() + hour() + minute() + second() + '.png');
}