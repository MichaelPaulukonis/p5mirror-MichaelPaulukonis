let s = 20;
let prevs = []

function setup() {
  pixelDensity(1); //this did the trick!~~
  createCanvas(400, 400);
  // noCanvas();
  w = width / s;
  h = w;
  video = createCapture(VIDEO);
  video.size(s, s);
  video.hide()
}

// TODO: store color of each square
// tween the color change, so we don't fuzz quite so much
function draw() {
  background(220);
  for (let i = 0; i < s; i++) {
    for (let j = 0; j < s; j++) {
      const loc = (i * s) + j;
      let v = video.get(i, j);
      if (prevs[loc]) {
        // eh, it does reduce _some_ flickering....
        v = lerpColor(prevs[loc], color(v), 0.5)
      }
      fill(v);
      prevs[loc] = color(v);
      rect(i * w, j * h, w, h)
    }
  }
}