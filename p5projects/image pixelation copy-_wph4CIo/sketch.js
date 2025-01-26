function preload() {
  photo = loadImage("War-Room_500.jpg");

}

function setup() {
  createCanvas(510, 300);
}

function draw() {
  photo.loadPixels();
  //photo.pixels
  for (let i = 0; i < 500; i++) {
    let rx = random(photo.width);
    let ry = random(photo.height);
    let c = photo.get(rx, ry);
    fill(c);
    noStroke();
    background(220);
    let x = photo;
  }
}