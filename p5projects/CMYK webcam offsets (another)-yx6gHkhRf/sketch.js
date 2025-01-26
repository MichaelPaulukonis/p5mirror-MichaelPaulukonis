// attempted conversion of http://cedric-villain.info/site/index.php?post/2017/02/12/CMYK-webcam-filter
// import processing.video.*; // import de la librairie Video (à charger dans les Outils)
let webcam; // définition de l'objet camera
var pas = 5; // définition d'une variable "pas" qui définit la finesse de la trame
var w = 320;
var h = 240;
var videoc;
var videom;
var videoy;
var videok;


function setup() {
  createCanvas(640, 480); // taille de la fenetre
  // webcam = new Capture(this, w, h); // définition de la webcam et ses dimensions
  webcam = createCapture(VIDEO)
  // webcam.start(); // initialisation de la webcam
  frameRate(2); // définit la fréquence du sketch
  background(255); // fond de la fenetre
}

function draw() {
  loadPixels();
  var pixtotal = w * h;
  var videoc = new Array(pixtotal);
  var videom = new Array(pixtotal);
  var videoy = new Array(pixtotal);
  var videok = new Array(pixtotal);

  if (webcam.loadedmetadata) {
    webcam.read();
  }
  noStroke();

  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      var c = webcam.get(x, y);
      var loc = x + y * w;
      videoc[loc] = 255 - (red(c));
      videom[loc] = 255 - (green(c));
      videoy[loc] = 255 - (blue(c));
      videok[loc] = 255 - brightness(c);
    }
  }
  fill(255);
  rect(0, 0, width, height);
  //image(webcam,w,0);

  for (var x = 0; x < w; x += pas) {
    for (var y = 0; y < h; y += pas) {
      var loc = x + y * w;
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
