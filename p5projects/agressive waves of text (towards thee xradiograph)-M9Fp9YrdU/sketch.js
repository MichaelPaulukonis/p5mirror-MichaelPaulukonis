let sketch = function(p) {
  let cols, rows;
  let scl = 15;
  let w, h;
  let words;
  let grid = [];
  let zoff = 0;
  let wordObjects = [];
  let letters = "..........,,,,,:::::;;;;;'''''\"\"\"".split('');

  p.setup = function() {
    p.createCanvas(600, 600);
    p.frameRate(5);
    w = p.width;
    h = p.height;
    cols = p.floor(w / scl);
    rows = p.floor(h / scl);
    p.textSize(scl - 4);
    p.textAlign(p.CENTER, p.CENTER);

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

    words = p.splitTokens(sourceText.toUpperCase(), ' ,.;\n').slice(0, 10)

    for (let y = 0; y < rows; y++) {
      let row = [];
      for (let x = 0; x < cols; x++) {
        row.push(new Cell(x, y));
      }
      grid.push(row);
    }

    // Initialize wordObjects with random positions
    for (let i = 0; i < words.length; i++) {
      let x = p.floor(p.random(cols));
      let y = p.floor(p.random(rows));
      wordObjects.push(new Word(words[i], x, y, p));
    }
  };

  p.draw = function() {
    p.background(255);
    let yoff = 0;

    // Clear the grid and fill with random letters
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x].clear();
        let n = p.noise(x * 0.1, y * 0.1, zoff);
        let char = letters[p.floor(n * letters.length)];
        grid[y][x].setLetter(char);
      }
    } 

    // Update word positions and assign characters to the grid
    for (let i = 0; i < wordObjects.length; i++) {
      wordObjects[i].update(wordObjects);
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
  };

  class Cell {
    constructor (x, y) {
      this.x = x
      this.y = y
      this.letter = ' '
    }

    clear () {
      this.letter = ' '
    }

    setLetter (letter) {
      this.letter = letter
    }

    display () {
      p.fill(0)
      p.text(this.letter, this.x * scl + scl / 2, this.y * scl + scl / 2)
    }
  }

  class Word {
    constructor(text, x, y, ctx) {
      this.ctx = ctx;
      this.text = text;
      this.x = x;
      this.y = y;
      this.xoff = this.ctx.random(1000);
      this.yoff = this.ctx.random(1000);
      this.zoff = this.ctx.random(1000);
      this.isVertical = Math.random() < 0.5; // 50-50 chance of being vertical
    }
  
    touches(other) {
      if (this.isVertical === other.isVertical) {
        if (this.isVertical) {
          if (this.x !== other.x) return 0;
          let { minWord, maxWord } =
            this.y < other.y
              ? { minWord: this, maxWord: other }
              : { minWord: other, maxWord: this };
          const overlap = maxWord.y - (minWord.y + minWord.text.length);
          return overlap >= 0 ? 0 : -overlap;
        } else {
          if (this.y !== other.y) return 0;
          let { minWord, maxWord } =
            this.x < other.x
              ? { minWord: this, maxWord: other }
              : { minWord: other, maxWord: this };
          const overlap = maxWord.x - (minWord.x + minWord.text.length);
          return overlap >= 0 ? 0 : -overlap;
        }
      } else {
        // Handle overlap between horizontal and vertical words
        if (this.isVertical) {
          if (other.x >= this.x && other.x < this.x + 1 && this.y >= other.y && this.y < other.y + other.text.length) {
            return 1;
          }
        } else {
          if (this.x >= other.x && this.x < other.x + other.text.length && other.y >= this.y && other.y < this.y + 1) {
            return 1;
          }
        }
        return 0;
      }
    }
  
    resolveOverlap(words) {
      for (let word of words) {
        if (word !== this) {
          let overlap = this.touches(word);
          if (overlap > 0) {
            let moveAmount = Math.ceil(overlap / 2);
            if (this.isVertical === word.isVertical) {
              let direction = this.isVertical ? (this.y < word.y ? -1 : 1) : (this.x < word.x ? -1 : 1);
              if (this.isVertical) {
                this.y += direction;
                word.y -= direction;
              } else {
                this.x += direction;
                word.x -= direction;
              }
            } else {
              if (this.isVertical) {
                this.y += 1;
              } else {
                this.x += 1;
              }
            }
          }
        }
      }
    }
  
    update(words) {
      const orig = { x: this.x, y: this.y };
      let moved = false;
      // avoid other words
      this.resolveOverlap(words);
      if (this.x !== orig.x || this.y !== orig.y) {
        moved = true;
      }
      if (!moved) {
        if (!moved) {
          const speed = 4
          this.x += Math.round(this.ctx.map(this.ctx.noise(this.xoff, this.zoff), 0, 1, -speed, speed));
          this.y += Math.round(this.ctx.map(this.ctx.noise(this.yoff, this.zoff), 0, 1, -speed, speed));
        }
      }
  
      // Wrap-around logic
      if (this.x < 0) this.x = cols;
      if (this.x > cols) this.x = 0;
      if (this.y < 0) this.y = rows;
      if (this.y > rows) this.y = 0;
  
      // Update noise offsets
      this.xoff += 0.002
      this.yoff += 0.002
      this.zoff += 0.1;
    }
  
    assignToGrid(grid) {
      for (let i = 0; i < this.text.length; i++) {
        let x = this.isVertical ? this.x : (this.x + i) % cols;
        let y = this.isVertical ? (this.y + i) % rows : this.y;
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[y][x].setLetter(this.text.charAt(i));
        }
      }
    }
  }
};

new p5(sketch);
