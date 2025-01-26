// originally from https://github.com/The-bastART/Deconstructing-Kandinsky/
// press 'n' to generate new

let canvas;
let cX = [],
  cY = [],
  cR = [],
  cH = [],
  cS = [],
  cV = [],
  cA = [],
  cSW = [];
let lX1 = [],
  lX2 = [],
  lY1 = [],
  lY2 = [],
  lSW = [];
let lOff = [],
  lOffProb = [],
  lOffAmt = [];
let lamt, camt;
let nav, mXt, mYt, mXr, mXs;
let eCnt = 0;
let conX1 = [],
  conX2 = [],
  conW1 = [],
  conW2 = [],
  conAmt;

function setup() {
  // NOTE: original size was 2000x2000
  // code withh do everything based on new width/height
  // BUT thickness of objects is NOT proportional
  canvas = createCanvas(1000, 1000);
  smooth(16);
}

function draw() {
  background(36, 12, 90);
  colorMode(HSB);
  angleMode(DEGREES);

  for (let i = 0; i <= 1 + conAmt; i++) {
    fill(cH[20 + i], 80, 70, cA[20 + i]);
    noStroke();
    beginShape();
    vertex(conX1[i], 0);
    vertex(conX2[i], height);
    vertex(conX2[i] + conW2[i], height);
    vertex(conX1[i] + conW1[i], 0);
    endShape(CLOSE);
  }

  push();
  translate(width / 2, height / 2);
  translate(mXt - width / 2, mYt - height / 2);
  rotate(map(mXr, 0, width, 0, 360));
  scale(map(mXs, 0, width, 0.2, 1.5), map(mXs, 0, width, 0.2, 1.5));
  switch (nav) {
    case 1:
      lastMousePos(0);
      break;
    case 2:
      lastMousePos(1);
      break;
    case 3:
      lastMousePos(2);
      break;
  }


  for (let i = 0; i <= camt; i++) {
    stroke(0);
    strokeWeight(lSW[i]);
    if (lOffProb[i] < 10) {
      line(lX1[i], lY1[i], lX2[i], lY2[i]);
    } else {
      line(lX1[i], lY1[i], lX2[i], lY2[i]);
      let offset = 30 + lOff[i];
      for (let p = 1; p <= lOffAmt[i]; p++) {
        line(lX1[i] + offset * p, lY1[i] + offset * p, lX2[i] + offset * p, lY2[i] + offset * p);
      }
    }
  }
  for (let i = 0; i <= lamt; i++) {
    stroke(0);
    strokeWeight(cSW[i]);
    fill(cH[i], 100, 70, cA[i]);
    circle(cX[i], cY[i], cR[i]);
  }
  pop();

  stroke(0);
  strokeWeight(80);
  noFill();
  circle(width / 2, height / 2, width / 1.1);

}

function lastMousePos(k) {
  switch (k) {
    case 0:
      mXt = mouseX;
      mYt = mouseY;
      break;
    case 1:
      mXr = mouseX;
      break;
    case 2:
      mXs = mouseX;
      break;
  }
}

function mouseClicked() {
  nav = 0;
}

function keyPressed() {
  if (key === "e" || key === "E") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch_" + eCnt, "png");
    eCnt += 1;
  } else if (key === "n" || key === "N") {
    colorGen();
    conAmt = Math.round(random(1));
    for (let i = 0; i <= 25; i++) {
      //Circle
      camt = 5 + random(10);
      cX[i] = -width / 4 + random(width / 2);
      cY[i] = -width / 4 + random(width / 2);
      cR[i] = random(width / 4); //Radius
      cA[i] = 0.05 + random(0.8); //Alpha
      cSW[i] = random(15);

      //Line
      lamt = 3 + random(8);
      lX1[i] = -width / 2.5 + random(width / 1.25);
      lX2[i] = -width / 2.5 + random(width / 1.25);
      lY1[i] = -width / 2.5 + random(width / 1.25);
      lY2[i] = -width / 2.5 + random(width / 1.25);
      lSW[i] = 1 + random(10);
      lOffProb[i] = Math.round(random(10));
      lOff[i] = Math.round(random(80));
      lOffAmt[i] = 1 + Math.round(random(2));

      //Cones
      conX1[i] = -width / 4 + random(width / 0.8);
      conX2[i] = -width / 4 + random(width / 0.8);
      conW1[i] = 50 + random(250);
      conW2[i] = 50 + random(250);
    }
  } else if (key === "t" || key === "T") {
    nav = 1;
  } else if (key === "r" || key === "R") {
    nav = 2;
  } else if (key === "s" || key === "S") {
    nav = 3;
  } else if (key === "x" || key === "X") {
    nav = 0;
  }
}

//COLOR GEN
function colorGen() {
  let Hseed = Math.floor(random(360));
  for (let i = 0; i <= 25; i++) {
    switch (Math.round(random(1))) {
      case 0:
        switch (Math.round(random(1))) {
          case 0:
            cH[i] = Hseed + Math.floor(random(20));
            break;
          case 1:
            cH[i] = Hseed - Math.floor(random(20));
            break;
        }
        cS[i] = 50 + random(50);
        cV[i] = 50 + random(50);
        break;
      case 1:
        switch (Math.round(random(1))) {
          case 0:
            cH[i] = hue_comp(Hseed) + Math.floor(random(20));
            break;
          case 1:
            cH[i] = hue_comp(Hseed) - Math.floor(random(20));
            break;
        }
        cS[i] = 50 + random(50);
        cV[i] = 50 + random(50);
        break;
    }
  }
}

//HUE COMP
function hue_comp(H) {
  let aR, aG, aB;
  let bR, bY, bB;
  let cH;
  let S = 100;
  let V = 100;

  aR = HSV2RGB(H, S, V)[0];
  aG = HSV2RGB(H, S, V)[1];
  aB = HSV2RGB(H, S, V)[2];

  bR = RGB2RYB(aR, aG, aB)[0];
  bY = RGB2RYB(aR, aG, aB)[1];
  bB = RGB2RYB(aR, aG, aB)[2];

  bR = 255 - bR;
  bY = 255 - bY;
  bB = 255 - bB;

  aR = RYB2RGB(bR, bY, bB)[0];
  aG = RYB2RGB(bR, bY, bB)[1];
  aB = RYB2RGB(bR, bY, bB)[2];

  cH = RGB2HSV(aR, aG, aB)[0];

  return cH;
}

//RGB<->RYB Conversion Code adopted from http://www.deathbysoftware.com/colors/index.html
function RGB2RYB(R, G, B) {
  let W = Math.min(R, G, B);
  R -= W;
  G -= W;
  B -= W;
  let MaxG = Math.max(R, G, B);

  let Y = Math.min(R, G);
  R -= Y;
  G -= Y;

  if (B > 0 && G > 0) {
    B /= 2;
    G /= 2;
  }

  Y += G;
  B += G;

  let MaxY = Math.max(R, Y, B);
  if (MaxY > 0) {
    let N = MaxG / MaxY;

    R *= N;
    Y *= N;
    B *= N;
  }

  R += W;
  Y += W;
  B += W;

  return [Math.floor(R), Math.floor(Y), Math.floor(B)];
}

function RYB2RGB(R, Y, B) {
  let W = Math.min(R, Y, B);
  R -= W;
  Y -= W;
  B -= W;
  let MaxY = Math.max(R, Y, B);

  let G = Math.min(Y, B);
  Y -= G;
  B -= G;

  if (B > 0 && G > 0) {
    B *= 2.0;
    G *= 2.0;
  }

  R += Y;
  G += Y;

  let MaxG = Math.max(R, G, B);

  if (MaxG > 0) {
    let N = MaxY / MaxG;

    R *= N;
    G *= N;
    B *= N;
  }

  R += W;
  G += W;
  B += W;

  return [Math.floor(R), Math.floor(G), Math.floor(B)];
}

//HSV<->RGB Conversion Code adopted from https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
function RGB2HSV(r, g, b) {
  (r = r / 255), (g = g / 255), (b = b / 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  s *= 100;
  v *= 100;
  h = Math.floor(h);
  return [h, s, v];
}

function HSV2RGB(h, s, v) {
  let r, g, b;

  h /= 360;
  s /= 100;
  v /= 100;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return [r * 255, g * 255, b * 255];
}