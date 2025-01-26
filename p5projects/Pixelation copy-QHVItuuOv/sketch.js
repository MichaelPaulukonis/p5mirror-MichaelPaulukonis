

let video;

let vScale = 8;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  console.log(video.width,video.height,width,height);
  video.size(width / vScale, height / vScale);
  console.log(video.width,video.height);
}
 
function draw() {
  background(51);
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (video.width - x + 1 + (y * video.width)) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;

      fill(r,g,b);

      rect(x * vScale, y * vScale, vScale, vScale);
    }
  }

}