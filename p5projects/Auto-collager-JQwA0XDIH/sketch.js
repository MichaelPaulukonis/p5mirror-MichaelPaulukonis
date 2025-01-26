// originally from https://editor.p5js.org/matamalaortiz/sketches/rk7thnM-e

var img1, img2, img3, img4, img5, img6, img7, img8, img9, img10;
var imgs


/** 

sizes
img1 : 496 545 
img2 : 358 428 
img3 : 499 594 
img4 : 499 475 
img5 : 274 775 
img6 : 539 484 
img7 : 563 624 
img8 : 306 511 
img9 : 324 376 
img10 : 256 207

**/

function preload() {
  img1 = loadImage('01.png');
  img2 = loadImage('02.png');
  img3 = loadImage('03.png');
  img4 = loadImage('04.png');
  img5 = loadImage('05.png');
  img6 = loadImage('06.png');
  img7 = loadImage('07.png');
  img8 = loadImage('08.png');
  img9 = loadImage('09.png');
  img10 = loadImage('10.png');
  imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER)
  drawit()
}

function mouseClicked() {
  drawit()
}

const pickArray = arr => arr.filter(a => random([0, 1]) === 0)

const drawit = () => {
  background(8)
  pickArray(imgs).forEach(i => {
    push()
    translate(random(width), random(height))
    rotate(radians(random(-180, 180)))
    // eh, I'm not feeling it
    // we end up with large images being WAY TOO LARGE
    // they should maybe more be scaled as a percentage of the canvas
    const size = random([100, 100, 200, 200, 300, 400]) / 200
    const w = i.width * size
    const h = i.height * size
    // console.log(size)
    // console.log(w, h)
    image(i, 0, 0, w, h)
    pop()
  })
}