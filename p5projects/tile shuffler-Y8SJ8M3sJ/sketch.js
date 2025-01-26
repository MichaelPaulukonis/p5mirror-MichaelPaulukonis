// mostly from gemini.google.com with the prompt
// "Can you write me some p5js code to shuffle the tiles of an image?""

let img;
let imgSquares = []; // Array to store image tiles

// Define number of tiles (columns and rows)
const horizontalSquareCount = 6;
const verticalSquareCount = 6;

// Variables to store tile size
let squareWidth;
let squareHeight;

function preload() {
  // Load your image here
  img = loadImage("fire.chief.jpg");
}

function setup() {
  createCanvas(600, 600);

  // Resize image to fit canvas (optional)
  img.resize(width, height);

  // Calculate size of each tile
  squareWidth = width / horizontalSquareCount;
  squareHeight = height / verticalSquareCount;

  // Create image tiles and store them in the array
  for (let y = 0; y < img.height; y += squareHeight) {
    for (let x = 0; x < img.width; x += squareWidth) {
      imgSquares.push(img.get(x, y, squareWidth, squareHeight));
    }
  }
  noLoop();
}

function draw() {
  mixup()
}

const mixup = () => {
  // Shuffle the image tiles
  imgSquares = shuffle(imgSquares);

  // Keep track of current tile position
  let squareX = 0;
  let squareY = 0;

  for (const square of imgSquares) {
    // Draw the shuffled tile
    image(square, squareX, squareY);

    // Move to the next tile position
    squareX += squareWidth;

    // Wrap around if reaching the end of the row
    if (squareX >= width) {
      squareX = 0;
      squareY += squareHeight;
    }
  }
};

function keyTyped() {
  if (key === "r") { mixup()}
};
