// The MIT License (MIT) - See Licence.txt for details
// Copyright (c) 2013 Mick Grierson, Matthew Yee-King, Marco Gillies

// originally from https://www.coursera.org/learn/digitalmedia

var player1
var player2
var filt
var maxim
var brushSel

function preload() {
  maxim = new Maxim();
  player1 = maxim.loadFile("assets/atmos1.wav");
  player1.setLooping(true);
  player2 = maxim.loadFile("assets/bells.wav");
  player2.setLooping(true);
  player1.volume(0.25);
}

function setup() {
  createSelector()
  createCanvas(640, 960);
  background(0);
  rectMode(CENTER);
}

function draw() {}

const createSelector = () => {
  brushSel = createSelect();
  ['rect', 'line', 'brush1', 'brush2', 'brush3', 'brush4', 'brush5', 'brush6', 'brush7'].forEach(opt => brushSel.option(opt))
  brushSel.value('brush5')
}

function mouseDragged() {
  player1.play();
  player2.play();

  var red = map(mouseX, 0, width, 0, 255);
  var blue = map(mouseY, 0, width, 0, 255);
  var green = dist(mouseX, mouseY, width / 2, height / 2);

  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
  var alpha = map(speed, 0, 20, 0, 10);
  //println(alpha);
  var lineWidth = map(speed, 0, 10, 10, 1);
  lineWidth = constrain(lineWidth, 0.5, 10);

  noStroke();
  fill(0, alpha);
  rect(width / 2, height / 2, width, height);

  stroke(red, green, blue, 255);
  strokeWeight(lineWidth);

  const brush = brushSel.value()
  switch (brush) {
    case 'rect':
      rect(mouseX, mouseY, speed, speed);
      break;

    case 'brush1':
      brush1(mouseX, mouseY, speed, speed, lineWidth);
      break

    case 'brush2':
      brush2(mouseX, mouseY, speed, speed, lineWidth);
      break

    case 'brush3':
      brush3(mouseX, mouseY, speed, speed, lineWidth);
      break

    case 'brush4':
      brush4(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
      break

    case 'brush5':
      brush5(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
      break

    case 'brush6':
      brush6(mouseX, mouseY, speed, speed, lineWidth);
      break

    case 'brush7':
      brush7(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
      break

    case 'line':
    default:
      line(pmouseX, pmouseY, mouseX, mouseY);
  }

  player1.setFilter(map(mouseY, 0, height, 50, 5000), 10);
  player2.ramp(1, 1000);
  player2.speed(mouseX / width / 2);

}

function mouseReleased() {
  player2.ramp(0, 1000);
}