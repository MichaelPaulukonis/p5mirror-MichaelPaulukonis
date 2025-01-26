// https://editor.p5js.org/allison.parrish/sketches/Ryvn6caCj

let text = "this is a test, this is only a test ";

function setup() {
  //createCanvas(400, 400);
  noCanvas();
  for (let i = 0; i < 1000; i++) {
    let sp = createSpan(text[i % text.length]);
    sp.style('font-size', '24px');
  }
}

function draw() {
  background(220);
  for (let elem of selectAll('span')) {
    let pos = elem.position();
    let newcolor = [
      256*noise(pos.x*0.01, pos.y*0.01, frameCount*0.1),
      256*noise(pos.x*0.01, pos.y*0.01, 100+(frameCount*0.1)),
      256*noise(pos.x*0.01, pos.y*0.01, 200+(frameCount*0.1))
    ];
    elem.style('color', "rgb(" + newcolor.join(",") + ")");
  }
  // for (let x = 0; x < windowWidth; x += 15) {
  //   for (let y = 0; y < windowHeight; y += 15) {
  //     let newcolor = [
  //       256*noise(x*0.05, y*0.05, frameCount*0.1),
  //       256*noise(x*0.05, y*0.05, 100+(frameCount*0.1)),
  //       256*noise(x*0.05, y*0.05, 200+(frameCount*0.1))
  //     ];
  //     document.elementFromPoint(x, y).style.color = 
  //       "rgb(" + newcolor.join(",") + ")";
  //   }
  // }
}