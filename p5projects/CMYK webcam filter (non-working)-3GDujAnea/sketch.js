// adapted from http://cedric-villain.info/site/index.php?post/2017/02/12/CMYK-webcam-filter
/* 
//////////// CMYK HALFTONE WEBCAM FILTER //////////////
////             by Cedric Villain                  ///
//           http://www.cedric-villain.info          //
///////////////////////////////////////////////////////

Change the webcam image so it looks like it was printed with halftone dots.
As the webcam data aren't available in the regular pixels[] array, 
the process of getting the effect asks a lot from the computer (get() function), each channel is being store in
two arrays every frame...

Also needs the video library

To use :
The keyboard letters 'c', 'm', 'y', 'k' displays or hide the cyan, magenta, yellow or black channels
The 's' key stores a PNG file of the current frame
The 'p' key stores a PDF file of the current frame with every dot as a vector object
The LEFT and RIGHT arrow keys scales the video frame in the window
The UP and DOWN arrow keys change the createCanvas of the dots

A good way to explain halftones to a classroom

*/




let webcam;
var pas = 4.5; // createCanvas of the dots
var echelle = 2; // scale of the video in the window
var record; // PDF recording var variable
var c = true; // > active c
var m = true; // > active m
var y = true; // > active y
var k = true; // > active k
var w = 320;
var h = 240;
var transp = 255;
var videoc;
var videom;
var videoy;
var videok;
var pixelsc;
var pixelsm;
var pixelsy;
var pixelsk;
let go = false;

function setup() {
  createCanvas(1280, 960); // createCanvas of window
  webcam = createCapture(VIDEO, ready);
  webcam.hide()
  //frameRate()(6);
  background(255);
}

function ready() {
  go = true;
}

function draw() {
  if (!go) return;

  console.log('starting!')
  
  // webcam.loadPixels();
  blendMode(BLEND);

  if (echelle < 0.5) {
    echelle = 0.5;
  }
  if (echelle > 10) {
    echelle = 10;
  }
  if (pas > 12.5) {
    pas = 12.5;
  }
  if (pas < 1.5) {
    pas = 1.5;
  }

  // Declare the arrays, two for each primary colors : one for the video, one for the dots
  var pixtotal = w * h;
  var videoc = []
  var videom = []
  var videoy = []
  var videok = []
  var pixelsc = []
  var pixelsm = []
  var pixelsy = []
  var pixelsk = []

  noStroke();

  // analyses the video and stores the values of each channels
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      const c = webcam.get(x, y);
      var loc = x + y * w;
      videoc[loc] = 255 - (red(c)); // for Cyan
      videom[loc] = 255 - (green(c)); // for Magenta
      videoy[loc] = 255 - (blue(c)); // for Yellow
      videok[loc] = 255 - ((red(c) + green(c) + blue(c)) / 3); // for Black (brightness(c) could have been used too)
    }
  }
  fill(255);
  rect(0, 0, width, height);
  
  console.log('first pass complete')

  /////// ANALYSE AND FILL OF THE ARRAYS //////////////////
  /* the tricky part is to display each channel with a precise angle (c75,m15,y90,k45 degrees),
  in the center of the screen and then scan the entire screen to store the values in an array */


  // ANALYSE BLACK
  push();
  translate(width / 2, height / 2);
  rotate(radians(-45));
  for (let x = 0; x < w; x += pas) {
    for (let y = 0; y < h; y += pas) {
      const loc = x + y * w;
      fill(255 - videok[loc]); // looks for the brightness value of the channel
      rect(x - w / 2, y - h / 2, pas, pas); // draw a mosaic of the channel values
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const loc = x + y * width;
      pixelsk[loc] = get(x, y); // fill an array with values of the whole screen
    }
  }
  pop();

  fill(255);
  rect(0, 0, width, height); // clears the screen

  console.log('done with black')
  

  // ANALYSE MAGENTA
  push();
  translate(width / 2, height / 2);
  rotate(radians(15));
  for (var x = 0; x < w; x += pas) {
    for (var y = 0; y < h; y += pas) {
      var loc = x + y * w;
      fill(255 - videom[loc]);
      rect(x - w / 2, y - h / 2, pas, pas);
    }
  }
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var loc = x + y * width;
      pixelsm[loc] = get(x, y);
    }
  }
  pop();

  console.log('done with magenta')
  
  fill(255);
  rect(0, 0, width, height);

  // ANALYSE CYAN
  push();
  translate(width / 2, height / 2);
  rotate(radians(-15));
  for (var x = 0; x < w; x += pas) {
    for (var y = 0; y < h; y += pas) {
      var loc = x + y * w;
      fill(255 - videoc[loc]);
      rect(x - w / 2, y - h / 2, pas, pas);
    }
  }
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var loc = x + y * width;
      pixelsc[loc] = get(x, y);
    }
  }
  pop();

  fill(255);
  rect(0, 0, width, height);

  // ANALYSE YELLOW
  push();
  translate(width / 2, height / 2);
  for (var x = 0; x < w; x += pas) {
    for (var y = 0; y < h; y += pas) {
      var loc = x + y * w;
      fill(255 - videoy[loc]);
      rect(x - w / 2, y - h / 2, pas, pas);
    }
  }
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var loc = x + y * width;
      pixelsy[loc] = get(x, y);
    }
  }
  pop();
  /////// END OF THE ANALYSE  ////////////


  fill('#f5f0e4'); // paper color
  rect(0, 0, width, height); // clears the frame
  blendMode(MULTIPLY); // to simulate ink transparency
  noStroke(); // repeated instruction for PDF only



  /////// START OF THE PRINTING  ////////////
  /* Consist in drawing the points of the frame with a reverse angle from the analyse
  to make them look straight */

  /// CYAN PRINT
  if (c) { // displays the cyan Channel if the "c" var variable is "true"
    push();
    translate(width / 2, height / 2);
    rotate(radians(15));
    scale(echelle);

    for (var x = 0; x < width; x += pas) {
      for (var y = 0; y < height; y += pas) {
        var loc = x + y * width;
        var colc = 255 - brightness(pixelsc[loc]);
        var pasc = map(colc, 0, 255, 0, pas) / 1.3;
        fill('#29abeb', transp);
        if (pasc != 0) { // to afunction empty ellipses in the PDF file
          ellipse(x - width / 2, y - height / 2, pasc, pasc);
        }
      }
    }
    pop();
  }


  /// MAGENTA PRINT
  if (m) { // displays the magenta Channel if the "m" var variable is "true"
    push();
    translate(width / 2, height / 2);
    rotate(radians(-15));
    scale(echelle);
    for (var x = 0; x < width; x += pas) {
      for (var y = 0; y < height; y += pas) {
        var loc = x + y * width;
        var colm = 255 - brightness(pixelsm[loc]);
        var pasm = map(colm, 0, 255, 0, pas) / 1.2;
        fill('#ed1e79', transp);
        if (pasm != 0) {
          ellipse(x - width / 2, y - height / 2, pasm, pasm);
        }
      }
    }
    pop();
  }


  /// YELLOW PRINT
  if (y) { // displays the yellow Channel if the "y" var variable is "true"
    push();
    translate(width / 2, height / 2);
    scale(echelle);
    for (var x = 0; x < width; x += pas) {
      for (var y = 0; y < height; y += pas) {
        var loc = x + y * width;
        var coly = 255 - brightness(pixelsy[loc]);
        var pasy = map(coly, 0, 255, 0, pas) / 2;
        fill('#fcee21', transp);
        if (pasy != 0) {
          ellipse(x - width / 2, y - height / 2, pasy, pasy);
        }
      }
    }
    pop();
  }

  /// BLACK PRINT
  if (k) { // displays the black Channel if the "k" var variable is "true"
    push();
    translate(width / 2, height / 2);
    rotate(radians(45));
    scale(echelle);
    for (var x = 0; x < width; x += pas) {
      for (var y = 0; y < height; y += pas) {
        var loc = x + y * width;
        var colk = 255 - brightness(pixelsk[loc]);
        var pask = map(colk, 0, 255, 0, pas) / 1.5;
        fill(0);
        if (pask != 0) {
          ellipse(x - width / 2, y - height / 2, pask, pask);
        }
      }
    }
    pop();
  }
  console.log('done!')
  go = false;
}


function keyReleased() { // to store a PDF file of the image > note that the PDF is filled with vector data (each point is a cicrle)
  if (key == 's') {
    saveFrame("webcam_CMYK####.png");
  }
}

function keyPressed() {
  if (key == 'p') {
    record = true;
  } // PDF recording key
  if (key == 'c') {
    c = !c;
  } // displays and hide each channel
  if (key == 'm') {
    m = !m;
  }
  if (key == 'y') {
    y = !y;
  }
  if (key == 'k') {
    k = !k;
  }

  if (key == CODED) {
    if (keyCode == UP) { // increases the points createCanvas
      pas++;
      println("pas = " + pas);

    }
    if (keyCode == DOWN) { // decreases the points createCanvas
      pas--;
      println("pas = " + pas);

    }
    if (keyCode == LEFT) { // decreases the scale
      echelle -= 0.5;
      println("echelle = " + echelle);

    }
    if (keyCode == RIGHT) { // increases the scale
      echelle += 0.5;
      println("echelle = " + echelle);

    }
  }

}