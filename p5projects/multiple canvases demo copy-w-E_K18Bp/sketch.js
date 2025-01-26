let p, r; //two graphics canvases
let noiseSeed = 22;
let n = 0;
let numStripes = 6;

function setup() {
  createCanvas(400, 400);
  p = createGraphics(width/2, height/2);
  r = createGraphics(width, height);
  p.background(255);
  p.fill(0);
  rainbowStripes(r, numStripes);
}

function draw() {
  updateDancingSquare();
  image(r, 0, 0); //draw the rainbow background canvas
  image(p, mouseX, mouseY); //draw the square-bounce canvas
}

//the graphics object is passed in so we can do this to any canvas
function rainbowStripes(g, numStripes) {
  g.push();
  g.colorMode(HSB);
  let stripeWidth = g.width/numStripes;
  g.strokeWeight(stripeWidth);
  let c = 0;
  for(let i=stripeWidth/2;i<width;i+=stripeWidth) {
    g.stroke(map(i, 0, width, 0, 360), 100, 100);
    g.line(0, i, width, i);
  }
  g.pop();
}

function updateDancingSquare() {
  p.background(255); //white background on square-bounce canvas
  p.rect(p.width * noise(n+noiseSeed), p.height * noise(n+noiseSeed*2), 50, 50); //animated black square
  n += 0.05; //increment noise value
}

function mousePressed() {
  numStripes++;
  rainbowStripes(r, numStripes);
  noLoop();
}

function mouseReleased() {
  loop();
}



  /* image(sourceImage, dx, dy, dwidth, dheight, sx, sy, swidth, sheight); */
  // image(p, mouseX, mouseY, 100, 100, 0, 0, p.width/2, p.height/2);