const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

let pg;
let girl;
let girlLayer;
let mask;

const vertexShader = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
`;

const fragmentShader = `
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D u_Texture1;
uniform sampler2D u_Texture2;
uniform sampler2D u_Texture3;
uniform float u_Time;
uniform float u_MouseX;
uniform float u_MouseY;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
  vec4 top = texture2D(u_Texture1, uv);
  vec4 bottom = texture2D(u_Texture3, uv);
  vec4 mask = texture2D(u_Texture2, uv);

  gl_FragColor = mix(top, bottom, clamp(mask.r-0.0, 0.0,1.0));// * bottom.r);
  
}
`;

const fadeFrag = `
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D u_Texture;

void main() {
  vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

  gl_FragColor = texture2D(u_Texture, uv);// - 0.005;
  gl_FragColor = max(vec4(0.0), gl_FragColor);

  
}
`;

let maskShader;
let fadeLayer, fb;
let fadeShader;
function preload(){
 girl = loadImage("girl.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  pg = createGraphics(windowWidth, windowHeight);
  girlLayer = createGraphics(windowWidth, windowHeight);
  mask = createGraphics(windowWidth, windowHeight);
  
  fadeLayer = createGraphics(windowWidth, windowHeight, WEBGL);
  fb = createGraphics(windowWidth, windowHeight, WEBGL);
  
  maskShader = createShader(vertexShader, fragmentShader);
  
  fadeShader = fadeLayer.createShader(vertexShader, fadeFrag);
  
  
  pg.background(255,0);
  pg.textSize(24);
  pg.noStroke();
  pg.textFont("Times");
  
  mask.noStroke();
  
  background(0);
  noStroke();
  // blendMode(MULTIPLY);
  // smooth();
  
  fadeLayer.noStroke();
  
}

function draw() {
  
  
  // for(let i = 0; i<10; i++){
    // pg.fill(0, 10);
    // pg.rect(0,0,width, height);
   
   pg.image(fadeLayer, 0,0);
    const rand = int(random(0, letters.length-1));
    if(frameCount % 10 == 0){
    pg.fill(255);
    pg.textSize(random(5, 50));
    pg.textAlign(CENTER, CENTER);
    pg.text("We are watching you", random(width), random(height));
    }
  // }
  
  fadeLayer.shader(fadeShader);
  fadeShader.setUniform('u_Texture', pg); 
  fadeLayer.rect(0,0,width, height); 
  
  
  mask.blendMode(BLEND);
  mask.noStroke();
  // mask.fill(0,10);
  // mask.rect(0,0,width, height);
  // mask.fill(255);
  mask.strokeWeight(20);
  
  mask.stroke(255);
  mask.line(mouseX, mouseY, pmouseX, pmouseY);
  // mask.ellipse(mouseX, mouseY, 100);
  

  
//   // blendMode(MULTIPLY);
  
//   // image(pg, 0,0);
  girlLayer.push();
  girlLayer.imageMode(CENTER);
  girlLayer.image(girl, width/2,height/2);
  girlLayer.pop();
  
  shader(maskShader);
  maskShader.setUniform('u_Texture1', girlLayer);
  maskShader.setUniform('u_Texture2', mask);
  maskShader.setUniform('u_Texture3', pg);
  rect(0,0, width, height);
  
  // image(girlLayer, 0,0);
  // image(girlLayer, -width/2, -height/2);
  
  // image(fadeLayer, -width/2, -height/2, width, height);
  
}