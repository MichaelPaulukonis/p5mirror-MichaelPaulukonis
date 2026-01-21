// https://editor.p5js.org/jht9629-nyu/sketches/6vzZeu7LG
// shapes random innerCount v25

let my = {};
function setup() {
  my.ninner = 4;
  my.nwidth = 16;
  my.pmargin = 0.02;
  createCanvas(windowWidth, windowHeight);
  init_page();
  // frameRate(2);
  my.npause = getTargetFrameRate() * 30;
  setup_fullScreenButton();
}
function draw() {
  if (my.ipause > 0) {
    my.ipause = my.ipause - 1;
    if (my.ipause <= 0) {
      init_page();
    }
    return;
  }
  if (my.i >= my.arr.length) {
    my.innerCount += 1;
    if (my.innerCount >= my.ninner) {
      my.ipause = my.npause;
      return;
    }
    my.i = 0;
  }
  let [x, y] = my.arr[my.i];
  x += my.margin + my.w / 2;
  y += my.margin + my.h / 2;
  draw_bullseye(x, y, my.w, my.h);
  my.i += 1;
}
function init_vars() {
  my.innerCount = 0;
  my.ipause = 0;
  let p = my.nwidth;
  if (p < 1) p = 1;
  my.margin = width * my.pmargin;
  my.mwidth = max(width - my.margin * 2, 2);
  my.mheight = max(height - my.margin * 2, 2);
  my.w = my.mwidth / p;
  // my.w = Math.floor(my.mwidth / p);
  my.h = my.w;
  my.i = 0;
  my.arr = [];
  for (let y = 0; y < my.mheight; y += my.h) {
    for (let x = 0; x < my.mwidth; x += my.w) {
      my.arr.push([x, y]);
    }
  }
  shuffle(my.arr, true);
}
function draw_bullseye(x, y, w, h) {
  let n = my.ninner;
  let i = my.innerCount;
  // for (let i = 0; i < n; i++) {
  fill(random(255), random(255), random(255));
  let s = (n - i) / n;
  ellipse(x, y, w * s, h * s);
  // }
}
function init_page() {
  init_vars();
  background(random(255), random(255), random(255));
}
function mousePressed() {
  init_page();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init_page();
}

// --
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("?=v25 Full");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:42px");
  my.plusButton = createButton("[+]");
  my.plusButton.mousePressed(plusButton_action);
  my.plusButton.style("font-size:42px");
  my.minusButton = createButton("[-]");
  my.minusButton.mousePressed(minusButton_action);
  my.minusButton.style("font-size:42px");
}
function plusButton_action() {
  my.nwidth += 1;
  init_page();
}
function minusButton_action() {
  my.nwidth -= 1;
  init_page();
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  my.plusButton.remove();
  my.minusButton.remove();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  init_vars();
  // init_dim();
}

// Respond to window resizing event
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// https://editor.p5js.org/jht9629-nyu/sketches/KpCniSa1w
// shapes random frameRate v15

// https://editor.p5js.org/jht9629-nyu/sketches/GzlO70dCj
// shapes random array v17

// https://editor.p5js.org/jht9629-nyu/sketches/pW2RT5UHy
// shapes random array circle v20

// https://editor.p5js.org/jht9629-nyu/sketches/Iru8nBTSf
// shapes random pause v21

// https://editor.p5js.org/jht9629-nyu/sketches/n0LYuXRmX
// shapes random pause v22

// https://editor.p5js.org/jht9629-nyu/sketches/_waqMsgSP
// shapes random pause v23

// https://editor.p5js.org/jht9629-nyu/sketches/npE4WZS_0
// shapes random ninner v24
