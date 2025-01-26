let cols, rows;
let scl = 20;
let w, h;
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('')
let words;
let grid = [];
let zoff = 0;

function setup() {
  createCanvas(800, 800);
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
    let r = [];
    for (let x = 0; x < cols; x++) {
      r.push(new Cell(x, y));
    }
    grid.push(r);
  }
  frameRate(5)
}

function draw() {
  background(255);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      grid[y][x].update(xoff, yoff, zoff);
      grid[y][x].display();
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;
}

class Cell {
  constructor(x, y) {
    this.baseX = x * scl + scl / 2;
    this.baseY = y * scl + scl / 2;
    this.letter = random(letters);
  }

  update(xoff, yoff, zoff) {
    let n = noise(xoff, yoff, zoff);
    if (n > 0.6) {
      this.letter = random(words).charAt(floor(random(words).length));
    } else if (n > 0.3) {
      this.letter = random(letters);
    }
  }

  display() {
    fill(0);
    text(this.letter, this.baseX, this.baseY);
  }
}
