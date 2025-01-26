// https://www.youtube.com/watch?v=EmsunTaS6V4&list=PLsGCUnpinsDlrapHXuwccfswRIn7Z3Vm2&index=4

let img;
let customMask;
let img2;

function preload() {
  img = loadImage("/assets/liquor.jpg");
}

function setup() {
  createCanvas(img.width / 2, img.height / 2);
  noLoop();
}

function draw() {
  customMask = createGraphics(img.width / 2, img.height / 2);
  customMask.noStroke();
  customMask.fill(255);
  customMask.circle(img.width / 4, img.height / 4, 150);
  img.mask(customMask);
  imageMode(CENTER);
  background("blue");
  image(img, width / 2, 150);
  img2 = loadImage("assets/reuben.jpeg", addStars);
}

const addStars = () => {
  let star = createGraphics(100, 100);
  star.fill(255);
  star.noStroke();
  star.beginShape();

  let angleAmt = radians(30);
  for (let angle = 0; angle < TWO_PI; angle += angleAmt) {
    // center pt  + cos(angle) * radius
    let x = star.width / 2 + (cos(angle) * star.width) / 2;
    let y = star.height / 2 + (sin(angle) * star.height) / 2;
    star.vertex(x, y);

    x = star.width / 2 + (cos(angle + angleAmt / 2) * star.width) / 4;
    y = star.height / 2 + (sin(angle + angleAmt / 2) * star.height) / 4;
    star.vertex(x, y);
  }

  star.endShape(CLOSE);

  img2.resize(star.width, star.height);
  img2.mask(star);

  image(img2, 200, 400);

  for (let i = 0; i < 20; i++) {
    push();
    let x = random(0, width);
    let y = random(0, height);
    let a = random(-radians(45), radians(45));
    translate(x, y);
    rotate(a);
    image(img2, 0, 0);
    pop();
  }
};
