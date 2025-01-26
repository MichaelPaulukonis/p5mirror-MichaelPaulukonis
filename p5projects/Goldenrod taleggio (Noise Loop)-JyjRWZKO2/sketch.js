/** 
  * from http://joyofprocessing.com/showexample.php?ex=noise_loop
**/  

var frequency;

// Using an irrational number like PI (as opposed to an integer) prevents obvious pulsing
var noiseInterval;

// Due to noise's grid-like structure. To see what I mean, try using a value of 2,
// instead of PI.
function setup() {
  initializeFields();
  createCanvas(500, 500);
  smooth();
  background(0);
  noStroke();
  fill(color(0xff, 0xff, 0xff));
  colorMode(HSB, 1);
}

function draw() {
  colorMode(RGB, 256);
  fill(0, 0, 0, 10);
  rect(0, 0, width, height);
  noStroke();
  colorMode(HSB, 1);
  for (var i = 0; i < 300; ++i) {
    var x = map(
      noise(i * noiseInterval + frameCount * frequency),
      0,
      1,
      0,
      width
    );
    var y = map(
      noise(i * noiseInterval + 1 + frameCount * frequency),
      0,
      1,
      0,
      height
    );
    fill(i / 1000.0, 0.5, 1);
    ellipse(x, y, 5, 5);
  }
}

function initializeFields() {
  frequency = 0.001;
  noiseInterval = PI;
}
