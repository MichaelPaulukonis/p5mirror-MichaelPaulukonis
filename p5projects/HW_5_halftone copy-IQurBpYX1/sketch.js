var halftone;

function setup() {
  createCanvas(400, 500);
  // specify multiple formats for different browsers
  
  halftone = createVideo(['mickey.mp4']);
  halftone.loop();
  halftone.hide();
  noStroke();
  fill(0);

  slider = createSlider(5, 50, 5, 10);
  slider.position(480, 50);
  slider.style('width', '150px');
  
  rSlider = createSlider(0, 255, 0);
  rSlider.position(480, 70);
  rSlider.style('width', '150px');
  
  gSlider = createSlider(0, 255, 0);
  gSlider.position(480, 90);
  gSlider.style('width', '150px');
  
  bSlider = createSlider(0, 0, 255);
  bSlider.position(480, 110);
  bSlider.style('width', '150px');

	//
  pSize = createP('size');
  pSize.position(420, 30);
  
  pColR = createP('red');
 	pColR.position(420, 50);
 
  pColG = createP('green');
  pColG.position(420,70);
  
  pColB = createP('blue');
 	pColB.position(420,90);
  
}

function draw() {
  background(255);

  var val = slider.value();
  var rVal = rSlider.value();
  var gVal = gSlider.value();
  var bVal = bSlider.value();
  

  halftone.loadPixels();
  var stepSize = round(constrain(val, 6, 40));
  //console.log(stepSize)
  for (var y=0; y<height; y+=stepSize) {
    for (var x=0; x<width; x+=stepSize) {
      var i = y * width + x;
      var darkness = (255 - halftone.pixels[i*4]) / 255;
      var radius = stepSize * darkness;
      fill(color(rVal, gVal, bVal));
      ellipse(x, y, radius, radius);
    }
  }


  //background(val);
}