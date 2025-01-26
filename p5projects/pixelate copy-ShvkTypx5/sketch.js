let img;

function preload(){
  img = loadImage('mps.jpg');
}

function setup(){
  w = 188;
  h = 242;
  createCanvas(2*w,h);
}

function draw(){
pixelate();
image(img,w,0);
}

function pixelate(){
  let pixelSize = map(mouseX , 0, w, 5, 16);
  for (let i=0;i<w; i = i+pixelSize){
    for (let j=0;j<h; j = j+pixelSize){
      let c = img.get(i,j);
      fill(c);
      noStroke();
      ellipse(i,j,pixelSize,pixelSize);
    }
  }
}
