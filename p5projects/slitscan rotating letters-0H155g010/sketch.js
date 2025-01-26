// originally from https://editor.p5js.org/allison.parrish/sketches/r1zUM_h-4
let buf;
let currOffset = 0;
let multiplier = 0.075;
let pr = 0
let pg = 10000
let pb = 20000
let pa = 30000
let color1
let color2
let colorGetter1
let colorGetter2

function setup() {
  createCanvas(650, 1800);
  buf = createGraphics(400, 400);
  buf.textSize(350);
  buf.textAlign(CENTER, CENTER);
  colorGetter1 = getColorContained()
  colorGetter2 = getColorContained(50000)
  color1 = colorGetter1()
  color2 = colorGetter2()
}

function draw() {
  for (let i = 0; i < 26; i++) {
    drawLetters(i)
    let slice = buf.get(buf.width / 2, 0, 1, buf.height);
    image(slice, currOffset + 20, (height / 26) * i, 1, (height / 26));
    image(buf, 0, (height / 26) * i,
      (height / 26), (height / 26));
  }

  if (Math.floor((frameCount * multiplier) % (2 * PI)) === 6) {
    color1 = colorGetter1()
  }

  if (Math.floor((frameCount * multiplier * 2) % (2 * PI)) === 6) {
    color2 = colorGetter2()
  }

  currOffset++;
  if (currOffset > width) {
    currOffset = 0;
  }
}

const drawLetters = (i) => {
  buf.background(255);

  // buf.fill(0, 0, 255, 128);
  buf.fill(color1);
  buf.push();
  buf.translate(buf.width / 2, buf.height / 2);
  buf.rotate(frameCount * multiplier);
  buf.text(String.fromCharCode(i + 97), 0, 0);
  buf.pop();

  // buf.fill(255, 0, 0, 128);
  buf.fill(color2)
  buf.push();
  buf.translate(buf.width / 2, buf.height / 2);
  buf.rotate(frameCount * multiplier * 2);
  buf.text(String.fromCharCode(i + 65), 0, 0);
  buf.pop();
}

const getColorContained = (offset = 0) => {
  let pc = 0
  let t = 0.01
  return () => {
    pc += t
    const r = Math.floor(noise(pc + offset) * 255)
    const g = Math.floor(noise(pc + 10000 + offset) * 255)
    const b = Math.floor(noise(pc + 20000 + offset) * 255)
    const a = Math.floor(noise(pc + 30000 + offset) * 255)

    // console.log(r, g, b, a)

    return color(r, g, b, a)
  }
}


function mousePressed() {
  saveCanvas('screenshot', 'png');
}