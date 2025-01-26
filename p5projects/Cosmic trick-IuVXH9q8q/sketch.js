let words;
let wordObjects = [];
let cols, rows;
let scl = 80;
let zoff = 0;

function setup() {
  createCanvas(800, 800);
  textSize(20);
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
  cols = floor(width / scl);
  rows = floor(height / scl * 2);
  console.log(cols,rows)
  let wordIndex = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let word = words[wordIndex % words.length];
      wordObjects.push(new Word(word, x * scl, y * scl / 2));
      wordIndex++;
    }
  }
  console.log(wordIndex)
}

function draw() {
  background(255);
  let yoff = 0;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      if (index < wordObjects.length) {
        let word = wordObjects[index];
        word.update(xoff, yoff, zoff);
        word.display();
      }
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;
}

class Word {
  constructor(text, x, y) {
    this.text = text;
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
  }

  update(xoff, yoff, zoff) {
    this.x = this.baseX + (noise(xoff, yoff, zoff) - 0.5) * scl;
    this.y = this.baseY + (noise(xoff + 100, yoff + 100, zoff + 100) - 0.5) * scl;
  }

  display() {
    fill(0);
    text(this.text, this.x, this.y);
  }
}
