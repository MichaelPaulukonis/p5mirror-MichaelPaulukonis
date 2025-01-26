// from https://discourse.processing.org/t/text-reveal-along-a-path/1705/8?u=michaelpaulukonis

var message = "Lorem ipsum dolor sit amet," +
  "consectetur adipiscing elit.";
var messageAsChars = message.split('')
var charCount = messageAsChars.length;
var charCountToStep = 1.0 / charCount

var ap0x, ap0y,
  cp0x, cp0y,
  cp1x, cp1y,
  ap1x, ap1y;

function setup() {
  createCanvas(1024, 512);
  smooth(8);
  randomizePoints();
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  noFill();
  stroke('#007fff');
  bezier(ap0x, ap0y,
    cp0x, cp0y,
    cp1x, cp1y,
    ap1x, ap1y);

  noStroke();
  fill('#000000');

  var step0 = frameCount * 0.001;

  for (var i = 0; i < charCount; ++i) {
    var step1 = i * charCountToStep;
    var step2 = (step0 + step1) % 1.0;

    var x = bezierPoint(ap0x, cp0x, cp1x, ap1x, step2);
    var y = bezierPoint(ap0y, cp0y, cp1y, ap1y, step2);

    var tanx = bezierTangent(ap0x, cp0x, cp1x, ap1x, step2);
    var tany = bezierTangent(ap0y, cp0y, cp1y, ap1y, step2);

    var angle = atan2(tany, tanx);

    push();
    translate(x, y);
    rotate(angle);
    text(messageAsChars[i], 0.0, 0.0);
    pop();
  }
}

function mouseReleased() {
  randomizePoints();
}

function randomizePoints() {
  var halfw = width * 0.5;
  var halfh = height * 0.5;
  ap0x = random(0.0, halfw);
  cp0x = random(0.0, width);
  cp1x = random(0.0, width);
  ap1x = random(halfw, width);

  ap0y = random(0.0, halfh);
  cp0y = random(0.0, height);
  cp1y = random(0.0, height);
  ap1y = random(halfh, height);
}