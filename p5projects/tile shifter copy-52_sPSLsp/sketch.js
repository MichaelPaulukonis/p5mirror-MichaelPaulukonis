// mostly from gemini.google.com with the prompt
// "Can you write me some p5js code to shuffle the tiles of an image?""

let img;
let imgSquares = []; // Array to store image tiles in order
let painted = []; // shuffled tiles
let rotateTiles = false
// Define number of tiles (columns and rows)
const horizontalSquareCount = 6;
const verticalSquareCount = 6;

// Variables to store tile size
let cellWidth;
let cellHeight;

function preload() {
  // Load your image here
  img = loadImage("fire.chief.jpg");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  imageMode(CENTER);

  // Resize image to fit canvas (optional)
  img.resize(width, height);

  // Calculate size of each tile
  cellWidth = width / horizontalSquareCount;
  cellHeight = height / verticalSquareCount;

  // Create image tiles and store them in the array
  for (let y = 0; y < img.height; y += cellHeight) {
    for (let x = 0; x < img.width; x += cellWidth) {
      imgSquares.push(img.get(x, y, cellWidth, cellHeight));
    }
  }
  painted = [...imgSquares];
  noLoop();
  draw();
}

function draw() {
  renderTiles(painted);
}

function createShiftedArray(arr) {
  return arr.slice(1).concat(arr[0]);
}

const mixup = (tiles) => {
  // Shuffle the image tiles
  return shuffle([...tiles]);
};

function rotateGrid(grid, rows, cols) {
  const newGrid = new Array(rows * cols).fill(null); // Create a new grid to store rotated elements

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const newIndex = calculateNewIndex(i, j, rows, cols); // Calculate the new index based on rotation
      newGrid[newIndex] = grid[i * cols + j]; // Assign element from original grid to new position
    }
  }

  return newGrid;
}

function calculateNewIndex(row, col, rows, cols) {
  // Define logic here based on desired rotation (clockwise or counter-clockwise)
  // Here's an example for 90 degrees clockwise rotation:
  return (cols - 1 - col) * rows + row;
}

const renderTiles = (tiles) => {
  // Keep track of current tile position
  let squareX = 0;
  let squareY = 0;

  const numRows = verticalSquareCount;
  const numCols = horizontalSquareCount;


  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const index = x + y * numCols;
      const img = painted[index];
      const angle = rotateTiles ? (index * 90) % 360 : 0
      // console.log(`index: ${index} angle: ${angle}`);
      push();
      translate(x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2);
      rotate(angle);
      image(img, 0, 0, cellWidth, cellHeight);
      pop();
    }
  }
};

function keyTyped() {
  if (key === "s") {
    painted = createShiftedArray(painted);
    renderTiles(painted);
  } else if (key === "m") {
    painted = mixup(painted);
    renderTiles(painted);
  } else if (key === "r") {
    painted = rotateGrid(painted, horizontalSquareCount, verticalSquareCount);
    renderTiles(painted);
  } else if (key === "o") {
    painted = [...imgSquares];
    renderTiles(painted);
  }
  return false;
}
