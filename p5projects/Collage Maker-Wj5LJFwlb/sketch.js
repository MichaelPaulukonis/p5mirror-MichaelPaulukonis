// from https://editor.p5js.org/izzyb/sketches/pqgfLXVAI
var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var stick1;
var stick2;
var stick3;
var stick4;
var stick5;
var stick6;
var stick7;
var stick8;
var stick9;
var stick10;
var stick11;
var stick12;
var stick13;
var stick14;
var stick15;
var stick16;
var stick17;
var brush1;
var brush2;
var currImg;
var dropimg;
var dropimg2;

var currScene = 1;

function preload() {
  // load image
  img0 = loadImage("HOME.jpg")
  img1 = loadImage("NYC.jpg");
  img2 = loadImage("dreamers.jpg");
  img3 = loadImage("paradise.jpg");
  stick1 = loadImage('girls.png');
  stick2 = loadImage('smiley.png');
  stick3 = loadImage('NY.png');
  stick4 = loadImage('anna.png');
  stick5 = loadImage('coffee.png');
  stick6 = loadImage('EXPLORER.png');
  stick7 = loadImage('imagine.png');
  stick8 = loadImage('star.png');
  stick9 = loadImage('sunmoon.png');
  stick10 = loadImage('dream.png');
  stick11 = loadImage('space.png');
  stick12 = loadImage('fig.png');
  stick13 = loadImage('peach.png');
  stick14 = loadImage('herecomes.png');
  stick15 = loadImage('lemon.png');
  stick16 = loadImage('love.png');
  stick17 = loadImage('Pomegranate.png');
  brush1 = loadImage('blue.png');
  brush2 = loadImage('gold.png');

}      

function setup() {
  // create canvas
  fullscreen(true)
  const c = createCanvas(1920, 1080);
  background(img0);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
 // currImg = img1;
 // noLoop();
}

function draw() {

  //PINK Sequence S1
  var r = random(40)
  if (currScene == 1 && keyIsDown(CONTROL) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    stroke(255, 192, 212, random(255, 192, 212))
    line(pmouseX, pmouseY, mouseX, mouseY)
  }
  //BLUE Sequence S1
  var r2 = random(5)
  if (currScene == 1 && keyIsDown(OPTION) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    stroke(125, 176, 233, random(125, 176, 233))
    line(pmouseX, pmouseY, mouseX, mouseY)
  }
  //YELLOW Lines S2
  var x = mouseX
  var y = mouseY
  var px = pmouseX
  var py = pmouseY
  rectMode(CENTER)
  if (currScene == 2 && keyIsDown(CONTROL) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    strokeWeight(2.5);
    stroke(251, 209, 0)
    line(x, y, px + 9, py + 9)
  }

  //CIRCLE Brush
  var c1 = random(25);
  if (currScene == 2 && keyIsDown(OPTION) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    //CIRCLES
    noFill();
    stroke(255, 82, 14);
    strokeWeight(1.5);
    ellipse(mouseX, mouseY, c1, c1);
  }
  var c2 = random(15);
  var weight = dist(pmouseX, pmouseY, mouseX, mouseY);
  strokeWeight(weight);
  if (currScene == 3 && keyIsDown(CONTROL) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    //CIRCLES
    stroke(45, 132, 232);
    noFill();
    strokeWeight(1.5);
    ellipse(mouseX, mouseY, c2, c2);
  }
  var c3 = random(35);
  strokeWeight(weight);
  if (currScene == 3 && keyIsDown(OPTION) && mouseX > 625 && mouseX < 1850 && mouseY > 215 && mouseY < 1020) {
    //CIRCLES
    stroke(33, 63, 255);
    noFill();
    strokeWeight(1.5);
    ellipse(mouseX, mouseY, c3, c3);
  }
}

function gotFile(file) {
   imageMode(CORNER)
  if (file.type === 'image' && !dropimg) {
    dropimg = createImg(file.data, function() {
    //  image(dropimg, 600, 250, dropimg.height / 2, dropimg.width / 2);
       image(dropimg, 650, 250, 300, 300 * dropimg.height / dropimg.width);
    });
   dropimg.hide();
       
  } else if (file.type === 'image' && !dropimg2) {
    dropimg2 = createImg(file.data, function() {
  		//image(dropimg2, 1392, 550, dropimg2.height / 2, dropimg2.width / 2);
             image(dropimg, 1500, 575, 300, 300 * dropimg.height / dropimg.width);
    }); 
  dropimg2.hide();
  }
}

function keyPressed() {
   imageMode(CORNER)
  if (key == '1') {
    background('img1')
    image(img1, 0, 0, 1920, 1080);
    currScene = 1;
  }
  if (key == '2') {
    background('img2')
    image(img2, 0, 0, 1920, 1080);
    currScene = 2;
  }
  if (key == '3') {
    background('img3')
    image(img3, 0, 0, 1920, 1080);
    currScene = 3;
  }

}

function mousePressed() {
   imageMode(CENTER)
  if (currScene == 1) {
    if (mouseX > 40 && mouseX < 185 && mouseY > 235 && mouseY < 330) {
      currImg = stick1
    } else if (mouseX > 81 && mouseX < 148 && mouseY > 355 && mouseY < 422) {
      currImg = stick2;
    } else if (mouseX > 79 && mouseX < 152 && mouseY > 445 && mouseY < 520) {
      currImg = stick3;
    } else if (mouseX > 236 && mouseX < 316 && mouseY > 234 && mouseY < 387) {
      currImg = stick4;
    } else if (mouseX > 232 && mouseX < 318 && mouseY > 400 && mouseY < 530) {
      currImg = stick5;
    }
  } else if (currScene == 2) {
    if (mouseX > 50 && mouseX < 159 && mouseY > 230 && mouseY < 340) {
      currImg = stick6;
    } else if (mouseX > 64 && mouseX < 143 && mouseY > 356 && mouseY < 425) {
      currImg = stick7;
    } else if (mouseX > 60 && mouseX < 143 && mouseY > 445 && mouseY < 525) {
      currImg = stick8;
    } else if (mouseX > 220 && mouseX < 322 && mouseY > 230 && mouseY < 340) {
      currImg = stick9;
    } else if (mouseX > 204 && mouseX < 329 && mouseY > 358 && mouseY < 414) {
      currImg = stick10;
    } else if (mouseX > 220 && mouseX < 296 && mouseY > 425 && mouseY < 531) {
      currImg = stick11;
    }
  } else if (currScene == 3) {
    if (mouseX > 55 && mouseX < 146 && mouseY > 237 && mouseY < 331) {
      currImg = stick12;
    } else if (mouseX > 58 && mouseX < 162 && mouseY > 343 && mouseY < 413) {
      currImg = stick13;
    } else if (mouseX > 58 && mouseX < 162 && mouseY > 439 && mouseY < 527) {
      currImg = stick14;
    } else if (mouseX > 222 && mouseX < 307 && mouseY > 230 && mouseY < 347) {
      currImg = stick15
    } else if (mouseX > 200 && mouseX < 318 && mouseY > 345 && mouseY < 411) {
      currImg = stick16;
    } else if (mouseX > 230 && mouseX < 325 && mouseY > 437 && mouseY < 528) {
      currImg = stick17;
    }
  }
  if (currImg && mouseX > 587 && mouseX < 1893 && mouseY > 178 && mouseY < 938) {
    image(currImg, mouseX, mouseY, 125, 125);
}
}