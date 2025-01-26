// mostly from gemini.google.com with the prompt
// "Can you write me some p5js code to shuffle the tiles of an image?""

let img;
let imgSquares = []; // Array to store image tiles in order
let painted = []; // shuffled tiles

// Define number of tiles (columns and rows)
const horizontalSquareCount = 20;
const verticalSquareCount = 20;

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

  for (const square of tiles) {
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
    painted = [...imgSquares]
    renderTiles(painted);
  }
  return false;
}
