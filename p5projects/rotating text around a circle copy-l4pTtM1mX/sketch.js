// by allison.parrish


let lines = `Rose, harsh rose, 
marred and with stint of petals, 
meagre flower, thin, 
sparse of leaf, 
more precious 
than a wet rose 
single on a stem— 
you are caught in the drift. 
Stunted, with small leaf, 
you are flung on the sand, 
you are lifted 
in the crisp sand 
that drives in the wind.`.split("\n");

function setup() { 
  noCanvas();
  let count = lines.length;
  for (let i = 0; i < count; i++) {
    let rotDeg = ((i/count) * 360);
    let elem = createDiv("");
    let span = createDiv(lines[i]);
    elem.position(windowWidth/2, windowHeight/2);
    elem.style("width", "350px");
    elem.style("font-family", "sans-serif");
    elem.style("font-size", "20px");    
    elem.style("color", "rgba(0, 0, 0)");
    elem.style("transform-origin", "right");
    //elem.style("border", "1px black solid");
    let transforms = [];
    if (rotDeg > 90 && rotDeg < 270) {
      transforms.push("scaleY(-1)");
      span.style("transform", "scaleX(-1)");
      span.style("text-align", "right");
    }
    transforms.push("perspective(400px)");
    transforms.push("rotateZ("+rotDeg+"deg)");
    transforms.push("rotateY(80deg)");
    elem.style("transform", transforms.join(" "));
    elem.child(span);
  }
} 

function draw() { 
  background(220);
}