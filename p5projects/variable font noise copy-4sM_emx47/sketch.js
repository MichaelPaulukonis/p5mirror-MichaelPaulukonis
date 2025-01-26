// by allison.parrish
// https://editor.p5js.org/allison.parrish/sketches/mtA3ZNZM3


let text = "colorless green ideas sleep furiously";
let allSpans = [];

function setup() {
  //createCanvas(400, 400);
  noCanvas();
  for (let i = 0; i < text.length; i++) {
    let sp = createSpan(text[i]);
    sp.style('font-size', '72px');
    sp.style('font-family', 'Soulcraft');
    sp.style('line-height', '0.75em');
    allSpans.push([sp, sp.position()]);
  }
  frameRate(15);
}

function draw() {
  background(220);
  
  for (let item of allSpans) {
    //let pos = elem.position();
    let pos = item[1];
    let elem = item[0];
    let stretchVal = map(
      noise(pos.x*0.04, pos.y*0.04, frameCount*0.05),
      0, 1,
      -50, 200
    );
    let slantVal = map(
      noise(pos.x*0.05, pos.y*0.05, 500+frameCount*0.1),
      0, 1,
      -50, 200
    );
    //elem.style('font-stretch', stretchVal + "%");
    elem.style('font-variation-settings',
               "'wdth' " + stretchVal + ", " +
               "'slnt' " + slantVal);

  }

}