const yellow = "#fac901";
const white = "#FAF9F6";
const blue = "#225095";
const red = "#dd0100";

const colors = [yellow, red, blue, white, white, white];

const wOpts = genFracs(10);
const hOpts = genFracs(20);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function genFracs(numFracs) {
  const testArr = [];
  for (let i = 0; i < numFracs; i++) {
    let num = getRandomArbitrary(0.3, 0.5);
    testArr.push(num);
  }

  let cumSum = testArr.reduce((acc, curr) => acc + curr, 0);
  const final = testArr.map((num) => {
    return num / cumSum;
  });

  return final;
}



let len = wOpts.length;
function setup() {
  createCanvas(1080, 1080);

  background(white);

  let options = wOpts.slice();

  const widths = [];
  for (let i = 0; i < wOpts.length; i++) {
    let selection = random(options);
    options = options.filter((option) => option !== selection);
    widths.push(selection * 1080);
  }

  const posX = [0];
  for (let i = 1; i < widths.length; i++) {
    posX[i] = posX[i - 1] + widths[i - 1];
  }

  options = hOpts.slice();
  const heights = [];
  for (let i = 0; i < hOpts.length; i++) {
    let selection = random(options);
    options = options.filter((option) => option !== selection);
    heights.push(selection * 1080);
  }

  const posY = [0];

  for (let i = 1; i < hOpts.length; i++) {
    posY[i] = posY[i - 1] + heights[i - 1];
  }
  const grid = [];

  for (let i = 0; i < widths.length; i++) {
    for (let j = 0; j < heights.length; j++) {
      grid.push(new Cell(posX[i], posY[j], widths[i], heights[j]));
    }
  }

  for (let i = 0; i < grid.length; i++) {
    const { posX, posY, width, height } = grid[i];
    strokeWeight(3);

    fill(random(colors));
    if (random() < 0.2) {
      push();
      fill("white");
      rect(posX, posY, width, height);
      pop();
      if (random() < 0.5) {
        rect(posX, posY, width, height / 2);
      } else {
        rect(posX, posY, width / 2, height);
      }
    } else {
      rect(posX, posY, width, height);
    }
  }
}

class Cell {
  constructor(posX, posY, width, height) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_26_22.jpeg");
  }
}
