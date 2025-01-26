// an adaptation of http://cedric-villain.info/site/index.php?post/2017/02/12/CMYK-webcam-filter
// I do not understand why it never refreshes, though.....
let webcam; // définition de l'objet camera
var pas = 5; // dot-size
var w = 320;
var h = 240;
var videoc;
var videom;
var videoy;
var videok;
const pixtotal = w * h;
let go = false;

function setup() {
  createCanvas(w * 2, h * 2)
  webcam = createCapture(VIDEO, ready);
  webcam.hide()
  noStroke();
}

function ready() {
  go = true;
}

function draw() {
  if (!go) return;

  // webcam.loadPixels()
  var videoc = []
  var videom = []
  var videoy = []
  var videok = []

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const c = webcam.get(x, y);
      const loc = x + y * w;
      videoc[loc] = 255 - (red(c));
      videom[loc] = 255 - (green(c));
      videoy[loc] = 255 - (blue(c));
      videok[loc] = 255 - brightness(c);
    }
  }
  fill(255);
  rect(0, 0, width, height);

  for (let x = 0; x < w; x += pas) {
    for (let y = 0; y < h; y += pas) {
      const loc = x + y * w;
      // Cyan
      fill(0, 255, 255);
      var pasc = map(videoc[loc], 0, 255, 0, pas);
      ellipse(x, y, pasc, pasc);
      // Magenta
      fill(255, 0, 255);
      var pasm = map(videom[loc], 0, 255, 0, pas);
      ellipse(x + w, y, pasm, pasm);
      // Yellow
      fill(255, 255, 0);
      var pasy = map(videoy[loc], 0, 255, 0, pas);
      ellipse(x, y + h, pasy, pasy);
      // Black
      fill(0);
      var pask = map(videok[loc], 0, 255, 0, pas);
      ellipse(x + w, y + h, pask, pask);
    }
  }
}