// display an image within the "window" of the canvas
// always covering the entire canvas
// never leaving any part uncovered

let large;
let small;
let menu;
let win = { width: 450, height: 500 };
let d;
let img;


const enlargen = () => random(1, 5);

const getScale = (img, boundary) => {
  const widthRatio = boundary.width / img.width;
  const heightRatio = boundary.height / img.width;

  const ratio = Math.max(Math.max(widthRatio, heightRatio), enlargen());

  return { x: img.width * ratio, y: img.height * ratio, ratio };
};

// used for display purposes
const apx = (r) => Math.floor(r * 10) / 10;
const data = (x, y) =>
  `${img.width}x${img.height} - ${apx(d.x)}x${apx(d.y)}:${apx(
    d.ratio
  )} - ${mouseX}.${mouseY} - ${x}x${y}`;

function preload() {
  large = loadImage("./large.jpg");
  small = loadImage("./small.jpg");
  menu = loadImage("./menu.jpg");
}

const pickImage = () => random([small, large, menu])

function setup() {
  createCanvas(win.width, win.height);
  stroke("white");
  strokeWeight(2);
  textSize(16);
  img = pickImage()
  d = getScale(img, win);
}

function draw() {
  const offsetX = constrain(
    map(mouseX, 0, win.width, 0, img.width * d.ratio - win.width),
    0,
    img.width * d.ratio - win.width
  );
  const offsetY = constrain(
    map(mouseY, 0, win.height, 0, img.height * d.ratio - win.height),
    0,
    img.height * d.ratio - win.height
  );
  image(
    img,
    0 - offsetX,
    0 - offsetY,
    img.width * d.ratio,
    img.height * d.ratio
  );

  text(data(offsetX, offsetY), 10, 20);
}

function keyPressed() {
  if (key === 'r') {
    img = pickImage()
    d = getScale(img, win);
  }
}
