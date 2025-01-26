// originally from https://editor.p5js.org/Lllucas/sketches/oZSSR7KXf
let video;
let button;
let snapshots = [];
let counter = 0;
total = 32;

function setup() {
  createCanvas(620, 240);
  background(0);
  video = createCapture(VIDEO, ready);
  video.size(320, 240);
  //  video.hide();
  //  button = createButton('Shoot');
  //  button.mousePressed(takesnap);
}

let go = false;

function ready() {
  go = true;
}

//function takesnap() {
//  history.push(video.get());
//	image(video, 0, 0);
//}

function draw() {
  if (go) {
    snapshots[counter] = video.get();
    counter++;
    if (counter == total) {
      counter = 0;
    }
  }
  let h = 80;
  let w = 60;
  let x = 0;
  let y = 0;
  for (let i = 0; i < snapshots.length; i++) {
    let index = (i + frameCount) % snapshots.length;
    image(snapshots[index], x, y, w, h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
  //  tint(255, 0, 0)
  //  Draw it in canvas  
  //  image(video, 0, 0, height, width);


}