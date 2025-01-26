// CMYK Halftone Portrait Morph
// by August Luhrs Oct. 2018 - https://editor.p5js.org/DeadAugust/sketches/HkmMdCPsQ
// photos by Arne Svenson
// with lots of help from Dan Shiffman, Alejandro Matamala Ortiz, Allison Parrish
// built off template from webcam sketch from CCFestLA '17
// RGB --> CMYK formula derived after much head-ache from: 
// http://www.easyrgb.com/en/math.php and
// https://www.rapidtables.com/convert/color/rgb-to-cmyk.html and
// https://github.com/ertdfgcvb/CMYK/blob/master/cmyk/cmyk.pde
let Cdots = [];
let Mdots = [];
let Ydots = [];
let Kdots = [];

let w = 330; //width of base image
let h = 420; //height of base image
let w2 = 428; //width of rotated image
let h2 = 492; //height of rotated image
// let watio = w / w2;
// let hatio = h / h2;

let a = 155; //alpha
let s = 3; //stepSize

let screen;

let ladySlider;
let morphR;
let ladyP;
let ladyLoop = 1;
let ladyLoopToggle = 5;
let loopButton;
let loopButtToggle = false;
let loopText;
// let alphaSlider;
// let alphaP;
// let dotSlider;
// let lastD = 0;
// let dotP;
// let zoomSlider;
// let lastZ = 0;
// let zoomP;

let lady32_CK; //base image rotated (-15)
let lady32_M; //base image rotated (15)
let lady32_Y; //base image not rotated (0)

let lady24_CK;
let lady24_M;
let ladt24_Y;

let lady35_CK;
let lady35_M;
let lady35_Y;

let lady33_CK;
let lady33_M;
let lady33_Y;


function preload() {
  lady32_CK = loadImage('CMYK_rotatedCK.jpg');
  lady32_M = loadImage('CMYK_rotatedM.jpg');
  lady32_Y = loadImage("lady3.2_330x420.jpg");

  lady24_CK = loadImage('lady2.4_CK.jpg');
  lady24_M = loadImage('lady2.4_M.jpg');
  lady24_Y = loadImage('lady2.4_Y.jpg');

  lady35_CK = loadImage('lady35_CK.jpg');
  lady35_M = loadImage('lady35_M.jpg');
  lady35_Y = loadImage('lady35_Y.jpg');

  lady33_CK = loadImage('lady33_CK.jpg');
  lady33_M = loadImage('lady33_M.jpg');
  lady33_Y = loadImage('lady33_Y.jpg');
}

function setup() {
  //frameRate(1);
  //not good for mobile....
  if (windowWidth > windowHeight) {
    screen = windowHeight - 200;
  } else {
    screen = windowWidth - 200;
  }
  createCanvas(screen, screen, P2D);
  translate(width / 2, height / 2);
  angleMode(DEGREES);
  background(255);
  noStroke();
  ladyP = createP('Lady');
  ladyP.style('color', '#FFFFFF');
  ladyP.style('background-color', '#000000');
  ladySlider = createSlider(0, 100, 5);
  //ladySlider.position(0, 600);
  loopText = createP('Looping');
  loopText.style('color', '#FFFFFF');
  loopText.style('background-color', '#000000');
  loopButton = createButton('loop / pause');
  loopButton.mousePressed(loopPause);
  // alphaP = createP('Alpha');
  // alphaP.style('color', '#FFFFFF');
  // alphaP.style('background-color', '#000000');
  // alphaSlider = createSlider(20, 255, 105);
  //alphaSlider.position(0, 650);
  //dotP = createP('Dot Size');
  //dotP.style('color', '#FFFFFF');
  //dotP.style('background-color', '#000000');
  //dotSlider = createSlider(1, 12, 4);
  //dotSlider.position(0, 700);
  //zoomP = createP('Zoom (note, distortion)');
  //zoomP.style('color', '#FFFFFF');
  //zoomP.style('background-color', '#000000');
  //zoomSlider = createSlider(-200, 600, 0);
  //zoomSlider.position(0, 750);

  lady32_CK.loadPixels();
  lady32_M.loadPixels();
  lady32_Y.loadPixels();
  lady24_CK.loadPixels();
  lady24_M.loadPixels();
  lady24_Y.loadPixels();
  lady35_CK.loadPixels();
  lady35_M.loadPixels();
  lady35_Y.loadPixels();
  lady33_CK.loadPixels();
  lady33_M.loadPixels();
  lady33_Y.loadPixels();

  //CK load
  for (let x = -w2 / 2; x < w2 / 2; x += s) {
    for (let y = -h2 / 2; y < h2 / 2; y += s) {
      let xCK = int(map(x, -w2 / 2, w2 / 2, 0, w2));
      let yCK = int(map(y,-h2 / 2, h2 / 2, 0, h2));

      let l32_index = ((yCK * lady32_CK.width) + xCK) * 4;
      let l24_index = ((yCK * lady24_CK.width) + xCK) * 4;
      let l35_index = ((yCK * lady35_CK.width) + xCK) * 4;
      let l33_index = ((yCK * lady33_CK.width) + xCK) * 4;

      let l32_R = lady32_CK.pixels[l32_index];
      let l32_G = lady32_CK.pixels[l32_index + 1];
      let l32_B = lady32_CK.pixels[l32_index + 2];
      let l24_R = lady24_CK.pixels[l24_index];
      let l24_G = lady24_CK.pixels[l24_index + 1];
      let l24_B = lady24_CK.pixels[l24_index + 2];
      let l35_R = lady35_CK.pixels[l35_index];
      let l35_G = lady35_CK.pixels[l35_index + 1];
      let l35_B = lady35_CK.pixels[l35_index + 2];
      let l33_R = lady33_CK.pixels[l33_index];
      let l33_G = lady33_CK.pixels[l33_index + 1];
      let l33_B = lady33_CK.pixels[l33_index + 2];

      //RGB --> CMYK
      let l32_C = 1 - (l32_R / 255);
      let l32_M = 1 - (l32_G / 255);
      let l32_Y = 1 - (l32_B / 255);
      let l32_K = 1;
      if (l32_C < l32_K) {
        l32_K = l32_C;
      }
      if (l32_M < l32_K) {
        l32_K = l32_M;
      }
      if (l32_Y < l32_K) {
        l32_K = l32_Y;
      }
      l32_C = (l32_C - l32_K) / (1 - l32_K);

      let l24_C = 1 - (l24_R / 255);
      let l24_M = 1 - (l24_G / 255);
      let l24_Y = 1 - (l24_B / 255);
      let l24_K = 1;
      if (l24_C < l24_K) {
        l24_K = l24_C;
      }
      if (l24_M < l24_K) {
        l24_K = l24_M;
      }
      if (l24_Y < l24_K) {
        l24_K = l24_Y;
      }
      l24_C = (l24_C - l24_K) / (1 - l24_K);

      let l35_C = 1 - (l35_R / 255);
      let l35_M = 1 - (l35_G / 255);
      let l35_Y = 1 - (l35_B / 255);
      let l35_K = 1;
      if (l35_C < l35_K) {
        l35_K = l35_C;
      }
      if (l35_M < l35_K) {
        l35_K = l35_M;
      }
      if (l35_Y < l35_K) {
        l35_K = l35_Y;
      }
      l35_C = (l35_C - l35_K) / (1 - l35_K);

      let l33_C = 1 - (l33_R / 255);
      let l33_M = 1 - (l33_G / 255);
      let l33_Y = 1 - (l33_B / 255);
      let l33_K = 1;
      if (l33_C < l33_K) {
        l33_K = l33_C;
      }
      if (l33_M < l33_K) {
        l33_K = l33_M;
      }
      if (l33_Y < l33_K) {
        l33_K = l33_Y;
      }
      l33_C = (l33_C - l33_K) / (1 - l33_K);

      //cyan
      let dotC = new dot(x, y, l32_C, l24_C, l35_C, l33_C, 0, 255, 255);
      Cdots.push(dotC);
      //black
      let dotK = new dot(x, y, l32_K, l24_K, l35_K, l33_K, 0, 0, 0);
      Kdots.push(dotK);
    }
  }
  //M load
  for (let x = -w2 / 2; x < w2 / 2; x += s) {
    for (let y = -h2/ 2; y < h2 / 2; y += s) {
      let xM = int(map(x, -w2 / 2,w2 / 2, 0, w2));
      let yM = int(map(y, -h2 / 2, h2/ 2, 0, h2));

      let l32_index = ((yM * lady32_M.width) + xM) * 4;
      let l24_index = ((yM * lady24_M.width) + xM) * 4;
      let l35_index = ((yM * lady35_M.width) + xM) * 4;
      let l33_index = ((yM * lady33_M.width) + xM) * 4;

      let l32_R = lady32_M.pixels[l32_index];
      let l32_G = lady32_M.pixels[l32_index + 1];
      let l32_B = lady32_M.pixels[l32_index + 2];
      let l24_R = lady24_M.pixels[l24_index];
      let l24_G = lady24_M.pixels[l24_index + 1];
      let l24_B = lady24_M.pixels[l24_index + 2];
      let l35_R = lady35_M.pixels[l35_index];
      let l35_G = lady35_M.pixels[l35_index + 1];
      let l35_B = lady35_M.pixels[l35_index + 2];
      let l33_R = lady33_M.pixels[l33_index];
      let l33_G = lady33_M.pixels[l33_index + 1];
      let l33_B = lady33_M.pixels[l33_index + 2];

      //RGB --> CMYK
      let l32_C = 1 - (l32_R / 255);
      let l32_M = 1 - (l32_G / 255);
      let l32_Y = 1 - (l32_B / 255);
      let l32_K = 1;
      if (l32_C < l32_K) {
        l32_K = l32_C;
      }
      if (l32_M < l32_K) {
        l32_K = l32_M;
      }
      if (l32_Y < l32_K) {
        l32_K = l32_Y;
      }
      l32_M = (l32_M - l32_K) / (1 - l32_K);

      let l24_C = 1 - (l24_R / 255);
      let l24_M = 1 - (l24_G / 255);
      let l24_Y = 1 - (l24_B / 255);
      let l24_K = 1;
      if (l24_C < l24_K) {
        l24_K = l24_C;
      }
      if (l24_M < l24_K) {
        l24_K = l24_M;
      }
      if (l24_Y < l24_K) {
        l24_K = l24_Y;
      }
      l24_M = (l24_M - l24_K) / (1 - l24_K);

      let l35_C = 1 - (l35_R / 255);
      let l35_M = 1 - (l35_G / 255);
      let l35_Y = 1 - (l35_B / 255);
      let l35_K = 1;
      if (l35_C < l35_K) {
        l35_K = l35_C;
      }
      if (l35_M < l35_K) {
        l35_K = l35_M;
      }
      if (l35_Y < l35_K) {
        l35_K = l35_Y;
      }
      l35_M = (l35_M - l35_K) / (1 - l35_K);

      let l33_C = 1 - (l33_R / 255);
      let l33_M = 1 - (l33_G / 255);
      let l33_Y = 1 - (l33_B / 255);
      let l33_K = 1;
      if (l33_C < l33_K) {
        l33_K = l33_C;
      }
      if (l33_M < l33_K) {
        l33_K = l33_M;
      }
      if (l33_Y < l33_K) {
        l33_K = l33_Y;
      }
      l33_M = (l33_M - l33_K) / (1 - l33_K);

      //magenta
      let dotM = new dot(x, y, l32_M, l24_M, l35_M, l33_M, 255, 0, 255);
      Mdots.push(dotM);
    }
  }

  //Y load
  for (let x = -w / 2; x < w / 2; x += s) {
    for (let y = -h / 2; y < h / 2; y += s) {
      let xY = int(map(x, -w / 2, w / 2, 0, w));
      let yY = int(map(y, -h / 2, h / 2, 0, h));

      let l32_index = ((yY * lady32_Y.width) + xY) * 4;
      let l24_index = ((yY * lady24_Y.width) + xY) * 4;
      let l35_index = ((yY * lady35_Y.width) + xY) * 4;
      let l33_index = ((yY * lady33_Y.width) + xY) * 4;

      let l32_R = lady32_Y.pixels[l32_index];
      let l32_G = lady32_Y.pixels[l32_index + 1];
      let l32_B = lady32_Y.pixels[l32_index + 2];
      let l24_R = lady24_Y.pixels[l24_index];
      let l24_G = lady24_Y.pixels[l24_index + 1];
      let l24_B = lady24_Y.pixels[l24_index + 2];
      let l35_R = lady35_Y.pixels[l35_index];
      let l35_G = lady35_Y.pixels[l35_index + 1];
      let l35_B = lady35_Y.pixels[l35_index + 2];
      let l33_R = lady33_Y.pixels[l33_index];
      let l33_G = lady33_Y.pixels[l33_index + 1];
      let l33_B = lady33_Y.pixels[l33_index + 2];

      //RGB --> CMYK
      let l32_C = 1 - (l32_R / 255);
      let l32_M = 1 - (l32_G / 255);
      let l32_Y = 1 - (l32_B / 255);
      let l32_K = 1;
      if (l32_C < l32_K) {
        l32_K = l32_C;
      }
      if (l32_M < l32_K) {
        l32_K = l32_M;
      }
      if (l32_Y < l32_K) {
        l32_K = l32_Y;
      }
      l32_Y = (l32_Y - l32_K) / (1 - l32_K);

      let l24_C = 1 - (l24_R / 255);
      let l24_M = 1 - (l24_G / 255);
      let l24_Y = 1 - (l24_B / 255);
      let l24_K = 1;
      if (l24_C < l24_K) {
        l24_K = l24_C;
      }
      if (l24_M < l24_K) {
        l24_K = l24_M;
      }
      if (l24_Y < l24_K) {
        l24_K = l24_Y;
      }
      l24_Y = (l24_Y - l24_K) / (1 - l24_K);

      let l35_C = 1 - (l35_R / 255);
      let l35_M = 1 - (l35_G / 255);
      let l35_Y = 1 - (l35_B / 255);
      let l35_K = 1;
      if (l35_C < l35_K) {
        l35_K = l35_C;
      }
      if (l35_M < l35_K) {
        l35_K = l35_M;
      }
      if (l35_Y < l35_K) {
        l35_K = l35_Y;
      }
      l35_Y = (l35_Y - l35_K) / (1 - l35_K);

      let l33_C = 1 - (l33_R / 255);
      let l33_M = 1 - (l33_G / 255);
      let l33_Y = 1 - (l33_B / 255);
      let l33_K = 1;
      if (l33_C < l33_K) {
        l33_K = l33_C;
      }
      if (l33_M < l33_K) {
        l33_K = l33_M;
      }
      if (l33_Y < l33_K) {
        l33_K = l33_Y;
      }
      l33_Y = (l33_Y - l33_K) / (1 - l33_K);

      //yellow
      let dotY = new dot(x, y, l32_Y, l24_Y, l35_Y, l33_Y, 255, 255, 0);
      Ydots.push(dotY);
    }
  }

}

function draw() {
  translate(width / 2, height / 2);
  background(255);
  let lSlide = ladySlider.value();
  //let aSlide = alphaSlider.value();
  //let dSlide = dotSlider.value();
  //let zSlide = zoomSlider.value();

  if (loopButtToggle) { // loop Button
    if (ladyLoop >= 100 || ladyLoop <= 0) {
      ladyLoopToggle = ladyLoopToggle * -1;
      ladyLoop += ladyLoopToggle;
      //ladySlider.value(ladyLoop);

    } else {
      ladyLoop += ladyLoopToggle;
      ladySlider.value(ladyLoop);
    }
  }

  //K show
  push();
  rotate(-345);
  translate(s / 2, s / 2);
  for (let Kd of Kdots) {
    if (lSlide >= 0 && lSlide < 33) {
      morphR = map(lSlide, 0, 32, Kd.l32r, Kd.l24r);
    } else if (lSlide >= 33 && lSlide < 66) {
      morphR = map(lSlide, 33, 65, Kd.l24r, Kd.l35r);
    } else {
      morphR = map(lSlide, 66, 100, Kd.l35r, Kd.l33r);
    }
    Kd.morph(morphR);
  }
  pop();

  //C show
  push();
  rotate(-345);
  for (let Cd of Cdots) {
    if (lSlide >= 0 && lSlide < 33) {
      morphR = map(lSlide, 0, 32, Cd.l32r, Cd.l24r);
    } else if (lSlide >= 33 && lSlide < 66) {
      morphR = map(lSlide, 33, 65, Cd.l24r, Cd.l35r);
    } else {
      morphR = map(lSlide, 66, 100, Cd.l35r, Cd.l33r);
    }
    Cd.morph(morphR);
  }
  pop();

  //M show
  push();
  rotate(-15);
  for (let Md of Mdots) {
    if (lSlide >= 0 && lSlide < 33) {
      morphR = map(lSlide, 0, 32, Md.l32r, Md.l24r);
    } else if (lSlide >= 33 && lSlide < 66) {
      morphR = map(lSlide, 33, 65, Md.l24r, Md.l35r);
    } else {
      morphR = map(lSlide, 66, 100, Md.l35r, Md.l33r);
    }
    Md.morph(morphR);
  }
  pop();

  //Y show
  for (let Yd of Ydots) {
    if (lSlide >= 0 && lSlide < 33) {
      morphR = map(lSlide, 0, 32, Yd.l32r, Yd.l24r);
    } else if (lSlide >= 33 && lSlide < 66) {
      morphR = map(lSlide, 33, 65, Yd.l24r, Yd.l35r);
    } else {
      morphR = map(lSlide, 66, 100, Yd.l35r, Yd.l33r);
    }
    Yd.morph(morphR);
  }
}

function loopPause() {
  loopButtToggle = !loopButtToggle;
  if (loopButtToggle) {
    loopText.html('Looping');
  } else {
    loopText.html('Paused');
  }
}

class dot {
  constructor(_x, _y, _r32, _r24, _r35, _r33, _R, _G, _B) {
    this.x = _x;
    this.y = _y;
    this.l32r = _r32;
    this.l24r = _r24;
    this.l35r = _r35;
    this.l33r = _r33;
    this.R = _R;
    this.G = _G;
    this.B = _B;
  }
   morph(r) {
    fill(this.R, this.G, this.B, a);
    ellipse(this.x, this.y, s * r);
  }
  // morph(a, r, s) {
  //   fill(this.R, this.G, this.B, a);
  //   ellipse(this.x, this.y, s * r);
  // }
  // loopy(r){
  // 	ellipse(this.x, this.y, s * r);  
  // }
}