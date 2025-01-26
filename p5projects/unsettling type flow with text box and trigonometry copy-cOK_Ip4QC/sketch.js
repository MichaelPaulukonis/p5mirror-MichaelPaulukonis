
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textSize(24);
  fill(40, 40, 40);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text("It was the best of times. Such good times. It was the worst of times too! What a predicament.",
       0, 0, map(sin(frameCount*0.1), -1, 1, 40, width),
       map(cos(frameCount*0.08), -1, 1, 40, width)
      );
/*  noFill();
  stroke(0);
  rect(0, 0, 150, 150); */
}