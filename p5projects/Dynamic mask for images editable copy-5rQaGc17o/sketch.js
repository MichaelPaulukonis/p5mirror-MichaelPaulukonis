// originally from https://editor.p5js.org/sundfitg/sketches/_IBgvElBD
// This code has been written by Paolo Camerin, starting from the 
// Polar Perlin Noise Loop example from Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

//In this code it is possible to feed any picture 

let m;
let img;

let density;

let phase = 0;
let zoff = 0;

let minN;
let maxN;

let sFact = 1;


function preload() {
  img = loadImage('1.jpeg'); //Higher resolution image
  // img = loadImage('2.jpg');  // Low resolution image

}

function setup() {

  density = displayDensity(); //get thedensity of the screen

  createCanvas(img.width, img.height); //crete a canvas as big as the image

  m = createGraphics(img.width / ceil(density), img.height / ceil(density));
  //create the of screen canvas t draw the mask you want to use on your picture

  resizeCanvas(windowWidth, windowWidth * img.height / img.width);
}

function draw() {

  //clear(); //clear the whole canvas before redrawing the next frame in order to have 
  //transparency (instead of using background)

  minN = m.width / 6;
  maxN = m.width / 6 * 3;
  //defining range value for the mask animation

  //defining trigger for "zoom" animation when mouse is over the center of the image
  if (dist(mouseX, mouseY, width / 2, height / 2) < 100) {
    sFact = lerp(sFact, 1.4, 0.1);
    //if mouse is less then 100px from center then scale factor rises to hiher value
  } else {
    sFact = lerp(sFact, 1, 0.1);
    //if not move the scale factor to original value
  }
  strokeWeight(3);


  //start to draw the mask shape
  m.push();

  m.translate(m.width / 2, m.height / 2);

  m.clear();
  m.fill(255);
  m.noStroke();


  m.beginShape();
  //Noise level of te animation
  let noiseMax = 1;
  randomSeed(123);

  for (let a = 0; a < TWO_PI; a += radians(random(40, 70))) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, minN, maxN);
    let x = r * sFact * cos(a);
    let y = r * sFact * sin(a);
    m.vertex(x, y);
  }
  m.endShape(CLOSE);
  m.pop();
  //end of the mask drawing

  phase += map(sFact, 1, 1.4, 0.0001, 0.006, );
  zoff += 0.0006;
  //parameters that define speed of animation of the mask


  //load pixel of both my image and the mask image created off screen
  img.loadPixels();
  m.loadPixels();

  pixelDensity(density);

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      let i = (x + y * m.width * ceil(density)) * 4;
      //go through all the pixel of the mask image and apply the alpha value of mask to my image
      img.pixels[i + 3] = m.pixels[i + 3];

    }
  }

  //update pixels of both image and mask graphics
  m.updatePixels();
  img.updatePixels();

  //display masked image
  image(img, 0, 0, width, height);
}

function windowResized() {
  //resize cavas every time you resize the window keeping the proportion of the image
  resizeCanvas(windowWidth, windowWidth * img.height / img.width);
}