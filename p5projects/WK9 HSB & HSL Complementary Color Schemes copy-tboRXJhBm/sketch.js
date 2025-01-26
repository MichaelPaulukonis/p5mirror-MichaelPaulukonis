/*
Complementary Color Schemes
moving around HSB & HSL color wheels clockwise

another HSB reference 
https://editor.p5js.org/icm4.0/sketches/AY5ADqWuF
*/

// degrees of separation on color wheel
let deg = 180; 

let hSlider, sSlider, bSlider;
let _hSlider, _sSlider, _lSlider;

let total = 2;
let colWidth;

function setup() {
  createCanvas(400, 700);
  noStroke();
  colWidth = width / total;

  // HSB
  hSlider = createSlider(0, 360, 0);
  hSlider.position(20, 20)
  sSlider = createSlider(0, 100, 75);
  sSlider.position(20, 50)
  bSlider = createSlider(0, 100, 75);
  bSlider.position(20, 80)

  // HSL
  _hSlider = createSlider(0, 360, 0);
  _hSlider.position(20, 395)
  _sSlider = createSlider(0, 100, 75);
  _sSlider.position(20, 425)
  _lSlider = createSlider(0, 50, 38);
  _lSlider.position(20, 455)
}

function draw() {
  /************** HSB **************/
  push();
  colorMode(HSB, 360, 100, 100);
  let h = hSlider.value();
  let s = sSlider.value();
  let b = bSlider.value();

  for (let i = 0; i < total; i += 1) {
    fill(h + (i * deg), s, b)
    rect(i * colWidth, 0, colWidth, height / 2);
  }

  fill(0);
  text(`hue ${h}`, sSlider.x * 2 + sSlider.width, 35);
  text(`saturation ${s}`, sSlider.x * 2 + sSlider.width, 65);
  text(`brightness ${b}`, bSlider.x * 2 + bSlider.width, 95);
  pop();

  /************** HSL **************/
  push();
  colorMode(HSL, 360, 100, 50);
  let _h = _hSlider.value();
  let _s = _sSlider.value();
  let _l = _lSlider.value();

  for (let i = 0; i < total; i += 1) {
    fill(_h + (i * deg), _s, _l)
    rect(i * colWidth, 375, colWidth, height / 2);
  }

  fill(0);
  text(`hue ${_h}`, _hSlider.x * 2 + _hSlider.width, 410);
  text(`saturation ${_s}`, _sSlider.x * 2 + _sSlider.width, 440);
  text(`lightness ${_l}`, _lSlider.x * 2 + _lSlider.width, 470);
  pop();
}