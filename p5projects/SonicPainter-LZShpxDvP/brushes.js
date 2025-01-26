//The MIT License (MIT) - See Licence.txt for details

//Copyright (c) 2013 Mick Grierson, Matthew Yee-King, Marco Gillies


function brush1(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  ellipse(x, y, px, py);
  return;
}


function brush2(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  push();
  translate(x, y);
  rotate(random(px));
  rect(0 + random(50), 0 + random(50), 10, 10);
  pop();
  return;
}

function brush3(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  push();
  translate(x, y);
  rotate(random(px));
  line(0 + random(50), 0 + random(50), 0, 0);
  rotate(random(px));
  line(0 + random(50), 0 + random(50), 0, 0);
  rotate(random(px));
  line(0 + random(50), 0 + random(50), 0, 0);
  pop();

  return;
}

function brush4(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  line(px, py, x, y);
  line(px, py, x, y);
  line(width / 2 + ((width / 2) - px), py, width / 2 + ((width / 2) - x), y);
  line(px, height / 2 + ((height / 2) - py), x, height / 2 + ((height / 2) - y));
  line(width / 2 + ((width / 2) - px), height / 2 + ((height / 2) - py), width / 2 + ((width / 2) - x), height / 2 + ((height / 2) - y));
  return;
}

function brush5(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  line(px, py, x, y);
  line(width / 2 + ((width / 2) - px), py, width / 2 + ((width / 2) - x), y);
  line(px, height / 2 + ((height / 2) - py), x, height / 2 + ((height / 2) - y));
  line(width / 2 + ((width / 2) - px), height / 2 + ((height / 2) - py), width / 2 + ((width / 2) - x), height / 2 + ((height / 2) - y));
  line(width / 2 + ((width / 2) - py), width / 2 - ((width / 2) - px), width / 2 + ((width / 2) - y), width / 2 - ((width / 2) - x));
  line(height / 2 - ((height / 2) - py), width / 2 - ((width / 2) - px), height / 2 - ((height / 2) - y), width / 2 - ((width / 2) - x));
  line(width / 2 + ((width / 2) - py), height / 2 + ((height / 2) - px), width / 2 + ((width / 2) - y), height / 2 + ((height / 2) - x));
  line(width / 2 - ((width / 2) - py), height / 2 + ((height / 2) - px), width / 2 - ((width / 2) - y), height / 2 + ((height / 2) - x));
  return;
}

function brush6(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  px = px + random(50);
  py = py + random(50);
  ellipse(x, y, px, py);
  ellipse(width / 2 + ((width / 2) - x), y, px, py);
  ellipse(x, height / 2 + ((height / 2) - y), px, py);
  ellipse(width / 2 + ((width / 2) - x), height / 2 + ((height / 2) - y), px, py);
  ellipse(width / 2 + ((width / 2) - y), width / 2 - ((width / 2) - x), px, py);
  ellipse(height / 2 - ((height / 2) - y), width / 2 - ((width / 2) - x), px, py);
  ellipse(width / 2 + ((width / 2) - y), height / 2 + ((height / 2) - x), px, py);
  ellipse(width / 2 - ((width / 2) - y), height / 2 + ((height / 2) - x), px, py);
  return;
}

function brush7(x, y, px, py, lineWidth) {
  strokeWeight(lineWidth);
  line(px, py, x, y);
  line(width / 2 + ((width / 2) - px), py, width / 2 + ((width / 2) - x), y);
  return;
}