let slider;
let phase = 0;
let zoff = 0;
let button

var gif = new GIF({
  workers: 2,
  quality: 10
});

let canvas;


function setup() {
  canvas = createCanvas(400, 400);
  slider = createSlider(0, 10, 10, 0.1);
  button = createButton('render');
  button.mousePressed(() => {
    button.elt.disabled = 'disabled'
    gif.render()
  })
}

gif.on('finished', function(blob) {
  button.elt.disabled = ''
  window.open(URL.createObjectURL(blob));
});


function draw() {
  background(0, 25);
  gif.addFrame(canvas.elt);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  let noiseMax = slider.value();
  for (let a = 0; a < TWO_PI; a += 0.05) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.01;
  zoff += 0.01;
}