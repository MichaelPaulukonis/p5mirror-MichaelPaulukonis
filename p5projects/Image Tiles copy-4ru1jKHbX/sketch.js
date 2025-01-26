// https://happycoding.io/examples/p5js/images/image-tiles

let img;

// The squares the image is split into.
let imgSquares = [];

// How many squares should the image be split into?
// Try changing these values!
const horizontalSquareCount = 4;
const verticalSquareCount = 4;

// These variables will hold the size of the image squares.
// We need this to draw the squares in the right places.
let squareWidth;
let squareHeight;

function preload() {
  img = loadImage('images/cat-3.jpg');

  // Click the > menu to the left and look in
  // the images directory for more images to try!
  // Or upload your own image!
  // URLs also work, like this:
  // img = loadImage('https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg');
}

function setup() {
  createCanvas(500, 500);

  // Resize the image so it fits on the screen
  img.resize(width, height);

  // Calculate the size of the squares.
  squareWidth = width / horizontalSquareCount;
  squareHeight = height / verticalSquareCount;

  // Split the image up into squares.
  img.loadPixels();
  for (var y = 0; y < height; y += squareHeight) {
    for (var x = 0; x < width; x += squareWidth) {
      imgSquares.push(img.get(x, y, squareWidth, squareHeight));
    }
  }

  // other setup
  pd = pixelDensity();
  noLoop();
}

// We called noLoop() above so the draw() function is only called once.
// Click the mouse to redraw the squares in a different order!
function mouseClicked() {
  draw();
}

function draw() {

  // Randomize the order of the squares
  imgSquares = shuffle(imgSquares);

  // Keep track of the position of the current square.
  // We change these as we draw each square,
  // so we know where to draw the next one.
  let squareX = 0;
  let squareY = 0;
  for (const square of imgSquares) {
    // Draw this square.
    image(square, squareX, squareY);

    // Draw the next square to the right of this square.
    squareX += squareWidth;
    // If the square went off the right edge, move down
    // one row and start over at the left edge.
    if (squareX >= width) {
      squareX = 0;
      squareY += squareHeight;
    }
  }
}