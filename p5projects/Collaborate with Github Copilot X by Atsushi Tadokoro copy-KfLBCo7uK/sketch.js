function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noiseDetail(2, 1.0);
}

function draw(){
  let skip = width/60.0;
  let noiseScale = 0.001;
  let noiseSpeed = 0.0002;
  let shiftSpeed = -0.005;
  let shiftX = frameCount*shiftSpeed;
  let shiftY = frameCount*shiftSpeed/2.0;
  noStroke();
  
  for(let x = 0; x < width; x += skip){
    for(let y = 0; y < height; y += skip){
      let noiseVal = noise(x*noiseScale+shiftX, y*noiseScale+shiftY, millis()*noiseSpeed);
      let hue = map(noiseVal, 0, 1, 0, 360);
      let saturation = map(noiseVal, 0, 1, 90, 100);
      let brightness = map(noiseVal, 0, 1, 90, 100);
      fill(hue, saturation, brightness);
      rect(x, y, skip, skip);
    }
  }
}