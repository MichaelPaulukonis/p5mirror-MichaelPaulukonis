// from https://stackoverflow.com/questions/68528749/how-do-i-rotate-text-around-an-oval

let canvasWidth = 400;
let canvasHeight = 400;
let spinSpeed = 0.25;
let ellipseWidth = 280;
let ellipseHeight = 280;
let angle = 0;
let sourceText = "A beautiful piece of spinning text. ";
let sourceCharacters = sourceText.toUpperCase().split("");

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  textSize(18);
  textAlign(LEFT, BASELINE);
  stroke("rgba(255, 255, 255, 0.25)");
  fill("white");
}

function draw() {
  background(0);

  // Prepare for operations around circle
  translate(canvasWidth / 2, canvasHeight / 2);

  // Create a revolving angle
  if (angle < 360) {
    angle += spinSpeed;
  } else {
    angle = 0;
  }

  // Set variables for trigonometry
  let widthR = ellipseWidth / 2;
  let heightR = ellipseHeight / 2;
  let dx = widthR * cos(angle);
  let dy = heightR * sin(angle);

  // Set variable for offsetting each character
  let currentOffset = 0;

  // Loop through each chracter and place on oval edge
  for (let i = 0; i < sourceCharacters.length; i++) {
    push();
    const w = textWidth(sourceCharacters[i]);

    currentOffset += w / 2;

    dx = widthR * cos(angle + currentOffset);
    dy = heightR * sin(angle + currentOffset);

    translate(dx, dy);
    rotate(angle + currentOffset + 90);

    text(sourceCharacters[i], 0, 0);

    currentOffset += w / 2;
    pop();
  }
}
