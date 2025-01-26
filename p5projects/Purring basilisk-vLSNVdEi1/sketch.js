let cols, rows;
let scl = 20;
let w, h;
let words;
let grid = [];
let zoff = 0;
let wordObjects = [];

function setup() {
  createCanvas(800, 800);
  frameRate(5)
  w = width;
  h = height;
  cols = floor(w / scl);
  rows = floor(h / scl);
  textSize(scl - 4);
  textAlign(CENTER, CENTER);

  let sourceText = `Now is the winter of our discontent
  Made glorious summer by this sun of York;
  And all the clouds that lour'd upon our house
  In the deep bosom of the ocean buried.
  Now are our brows bound with victorious wreaths;
  Our bruised arms hung up for monuments;
  Our stern alarums changed to merry meetings,
  Our dreadful marches to delightful measures.
  Grim-visaged war hath smooth'd his wrinkled front;
  And now, instead of mounting barbed steeds
  To fright the souls of fearful adversaries,
  He capers nimbly in a lady's chamber
  To the lascivious pleasing of a lute.`;

  words = splitTokens(sourceText, ' ,.;\n');

  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(new Cell(x, y));
    }
    grid.push(row);
  }

  // Initialize wordObjects with random positions
  for (let i = 0; i < words.length; i++) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    wordObjects.push(new Word(words[i], x, y));
  }
}

function draw() {
  background(255);
  let yoff = 0;

  // Clear the grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].clear();
    }
  }

  // Update word positions and assign characters to the grid
  for (let i = 0; i < wordObjects.length; i++) {
    wordObjects[i].update(yoff, zoff);
    wordObjects[i].assignToGrid(grid);
  }

  // Display the grid
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      grid[y][x].display();
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  zoff += 0.01;
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.letter = ' ';
  }

  clear() {
    this.letter = ' ';
  }

  setLetter(letter) {
    this.letter = letter;
  }

  display() {
    fill(0);
    text(this.letter, this.x * scl + scl / 2, this.y * scl + scl / 2);
  }
}

class Word {
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.xoff = random(1000);
    this.yoff = random(1000);
  }

  update(yoff, zoff) {
    this.x = floor(noise(this.xoff, yoff, zoff) * cols);
    this.y = floor(noise(this.yoff, yoff, zoff) * rows);
    this.xoff += 0.01;
    this.yoff += 0.01;
  }

  assignToGrid(grid) {
    for (let i = 0; i < this.text.length; i++) {
      let x = (this.x + i) % cols;
      let y = this.y % rows;
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        grid[y][x].setLetter(this.text.charAt(i));
      }
    }
  }
}
