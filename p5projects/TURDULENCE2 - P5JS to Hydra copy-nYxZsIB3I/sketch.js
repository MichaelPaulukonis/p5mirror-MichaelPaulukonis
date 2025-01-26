/*
So this approach feeds a sketch buffer to Hydra.
Tom Smith. https://everythingability.com
See also: https://editor.p5js.org/remarkability/sketches/Kym_1i4t5
*/

var hydra = new Hydra({canvas: document.getElementById("hydraCanvas")})
let inc = 0.01
let z = inc
let font
let canvas
let cardWidth = 800;
let cardHeight = 800;
let theTextSize = 140
let hydraBuffer;
let p5Buffer
let theText = "maintain the turdulence"
let img

function preload(){
  font = loadFont("Inconsolata-Bold.ttf")
  img = loadImage("turd.png")
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function animateText(){
  let charNum = int(random(0, theText.length-1))
  let r = int(random(0,2))
  let theChar = theText.charAt(charNum)
  
  if(r==0){
    theChar = theChar.toUpperCase()
    //print(theChar)
    theText = setCharAt(theText,charNum,theChar);
  }else{
    theChar = theChar.toLowerCase()
    //print(theChar)
   theText = setCharAt(theText,charNum,theChar);
  }
  //print(theText)
}

function setup() {
  canvas = createCanvas(cardWidth, cardHeight, WEBGL);
  textFont(font)
  textSize(theTextSize)
  textAlign(CENTER)
  hydraBuffer = createGraphics(cardWidth, cardHeight);
  hydraBuffer.textFont(font)
  
  p5Buffer = createGraphics(cardWidth, cardHeight, WEBGL);
  p5Buffer.textFont(font)
  p5Buffer.textSize(theTextSize)
  p5Buffer.textAlign(CENTER)
  p5Buffer.angleMode(DEGREES)
  s0.init({src: p5Buffer.canvas})//put the sketch into s0

}

function draw() {
   //background(40);
  animateText()
  //do the sketch stuff    
  p5Buffer.push()
    p5Buffer.translate(-width/2, -height/2, 0.001)
    //p5Buffer.scale(z)
    p5Buffer.image(img, 0, 0) 
   p5Buffer.resetMatrix()
  p5Buffer.pop()
  
  
 
  
  p5Buffer.push()
    p5Buffer.translate(-200, -600, 0.001)
    p5Buffer.fill(255,0, 40); 
    p5Buffer.text(theText, 20, 380, 400, height)
  p5Buffer.pop()
  
  //update the hydra onto the HydraBuffer
  hydraBuffer.push()
    hydraBuffer.image(select("#hydraCanvas"), 0, 0, hydraBuffer.width, hydraBuffer.height);
  hydraBuffer.pop()
  
  //Draw resultant HydraBuffer to screen
  translate(-width/2, -height/2)
  image(hydraBuffer, 0, 0)
  
  /*z += inc
  print(z)//for some reason once zoomed in, it don't zoom back.
  if (z > 3) {
    inc = -inc
  }else if (z <0){ 
    inc = +inc
  }*/
}

function mousePressed(){
  saveCanvas("turdulence.png")
}

////////////////////////////// HYDRA /////////////////


//Load an image into the s1 var, OR use an image in p5
/*
imgEl = document.createElement('img');
imgEl.crossOrigin = 'anonymous';
imgEl.src = 'https://www-users.york.ac.uk/~tas509/cors/Boris_Johnson_AP.jpg'
s1.init({src: imgEl});
*/


voronoi(8,1)
.mult(osc(10,0.1,()=>Math.sin(time)*3).saturate(3).kaleid(3))
.modulate(o0,0.5)
.add(s0,0.8)
.scrollY(-0.01)
.scale(0.99)
.luma(0.3)
.scrollY(-0.01)
.modulate(voronoi(4,1),0.008)
.shift( 0.3, 0, 0, 4.4 )
//.saturate( 5.01 )
.diff(o1)
.blend(s0)
.mult(osc(2,0.5,1))
.diff(o1)
.out()