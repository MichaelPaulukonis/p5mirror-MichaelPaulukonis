// display an image within the "window" of the canvas
// always covering the entire canvas
// never leaving any part uncovered

let large;
let small;
let win = { width: 400, height: 400 };
let d;

const apxRatio = (r) => Math.floor(r * 10) / 10;

const getScale = (img, boundary) => {
  const widthRatio = boundary.width / img.width;
  const heightRatio = boundary.height / img.width;
  const ratio = Math.max(widthRatio, heightRatio);

  return { x: img.width * ratio, y: Math.round(img.height * ratio), ratio };
};

const data = (x, y) =>
  `${large.width}x${large.height} - ${d.x}x${d.y}:${apxRatio(
    d.ratio
  )} - ${mouseX}.${mouseY} - ${x}x${y}`;

function preload() {
  large = loadImage("./large.jpg");
  small = loadImage("./small.jpg");
}

function setup() {
  createCanvas(win.width, win.height);
  stroke("white");
  strokeWeight(2);
  textSize(16);
}

// NOW - what about an image that is SMALLER than the window?
// it will have to be enlarge proportionately, then.....

function draw() {
  background("white");
  const img = large; // small will need to be enlarged
  d = getScale(img, win);
  // this works for large images with no scaling
  // does NOT work for smaller
  // I'm leaving this because I lost the working code for a while
  // all of this should be easy, but my brain and math do not work well together
  const offsetX = constrain(
    map(mouseX, 0, win.width, 0, img.width - win.width),
    0,
    img.width - win.width
  );
  const offsetY = constrain(
    map(mouseY, 0, win.height, 0, img.height - win.height),
    0,
    img.height - win.height
  );
  // const offsetX = constrain(map(mouseX, 0, win.width, 0, (img.width * d.ratio) - win.width), 0, (img.width * d.ratio) - win.width)
  // const offsetY = constrain(map(mouseY, 0, win.height, 0, img.height * d.ratio - win.height), 0, img.height * d.ratio - win.height)
  // win.width - large.width <- right edge flush
  // win.height - large.height <- bottom flush
  // image(img, 0 - offsetX, 0 - offsetY, img.height * d.ratio, img.width * d.ratio)
  image(img, 0 - offsetX, 0 - offsetY); // img.height, img.width) // img.height * d.ratio, img.width * d.ratio)

  text(data(offsetX, offsetY), 10, 20);
}
