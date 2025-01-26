function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32); // Adjust starting text size for better scaling
  textAlign(CENTER, CENTER);
  noLoop()
}

// dang, still doesn't work.
// but look @ https://github.com/Pomax/lib-font
// from https://github.com/processing/p5.js/issues/356
// 
function draw() {
  background(220);
  const letter = "g"; // Replace with your desired letter
  let scaleFactor = min(width / textWidth(letter), (height - textDescent()) / textAscent());
  console.log(textDescent(), textAscent(), width / textWidth(letter), (height - textDescent()) / textAscent(), scaleFactor)
  // Scale the text proportionally to fit the canvas (considering descenders)
  push();
  translate(width / 2, height / 2);
  scale(scaleFactor);
  text(letter, 0, 0);
  pop();
}
