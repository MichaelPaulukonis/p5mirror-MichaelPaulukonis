/*P5.hershey.putText("Hello World!",{
	cmap:  HERSHEY_FONT.GOTHIC_GERMAN_TRIPLEX,
	align: "center",
	noise: 0.5,
});*/

function setup() {
  createCanvas(760, 240);
}

let src = "What is it that you think you are doing here today?";
let faces = [
  FONT_HERSHEY.COMPLEX,
  FONT_HERSHEY.ITALIC_COMPLEX,
  FONT_HERSHEY.COMPLEX_SMALL,
  FONT_HERSHEY.ITALIC_COMPLEX_SMALL,
  FONT_HERSHEY.DUPLEX,
  FONT_HERSHEY.ITALIC_TRIPLEX,
  FONT_HERSHEY.PLAIN,
  FONT_HERSHEY.SCRIPT_COMPLEX,
  FONT_HERSHEY.SIMPLEX,
  FONT_HERSHEY.SCRIPT_SIMPLEX,
  FONT_HERSHEY.TRIPLEX
];

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);
  noFill();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 4; j++) {
      let idx = (j*9) + i;
      push();
      translate(i * (width/9) + (width/18),
                j * (height/4) + (height/8));
      scale(1.667);
      let face = faces[
        int(noise(i*100, j*100, frameCount*0.001)*faces.length)];
      P5.hershey.putText(src[idx], {
        cmap: face,
        align: "center",
        noise: {
          x: (x,y) => map(noise(i+x*0.1, j+y*0.1, frameCount*0.005), 0, 1, -4, 4),
          y: (x,y) => map(noise(i+x*0.11, j+y*0.09, frameCount*0.0051), 0, 1, -4, 4)
        }
      });
      pop();
    }
  }
}