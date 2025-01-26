
function random_hash() {
  let x = "0123456789abcdef", hash = '0x'
  for (let i = 64; i > 0; --i) {
    hash += x[Math.floor(Math.random()*x.length)]
  }
  return hash
}

tokenData = {
  "hash": random_hash(),
  // "hash": "0x2a4b84533f3c293b41bd1258996239d113a32849ea86f84a95c09c11ea21481b",
  "tokenId": "123000456"
}

let hash = tokenData.hash;

let seed = parseInt(tokenData.hash.slice(0, 16), 16)
let p = []
for (let i = 0; i < 64; i+=2) {
  p.push(tokenData.hash.slice(i+2, i+4))
}
let rns = p.map(x => {return parseInt(x, 16) % 10})


var DEFAULT_SIZE = 800
var dimension = Math.min(window.innerWidth, window.innerHeight)

var spots;
var radius = [];
var m = [];
var x = [];
var y = [];
var mapL = 0;
var mapH = 9;

let camShader;

function preload(){
  // load the shader
  blurH = loadShader('base.vert', 'blur.frag');
  blurV = loadShader('base.vert', 'blur.frag');

}


function setup() {
  noiseSeed(seed);
  print("hash: " + hash);
  print("seed: " + seed);
  pixelDensity(2);
  canvas = createCanvas(dimension, dimension, WEBGL);
  canvas.id('p5canvas');
  // canvas.parent('sketch-holder');
  
  iC = createGraphics(dimension, dimension, WEBGL);
  pass1 = createGraphics(dimension, dimension, WEBGL);
  pass2 = createGraphics(dimension, dimension, WEBGL);

  pass1.noStroke();
  pass2.noStroke();

  iC.colorMode(HSB);
  colorMode(HSB);
  mainColorH = map(rns[11], mapL, mapH, 0, 360); //(0, 360);
  mainColorS = map(rns[12], mapL, mapH, 40, 100); //(40, 100);
  mainColorB = map(rns[13], mapL, mapH, 90, 100); //random(90, 100);
  radius1 = map(rns[21], mapL, mapH, dimension / 6, dimension);
  radius2 = map(rns[22], mapL, mapH, dimension / 6, dimension);

  
  spots = map(rns[0], mapL, mapH, 2, 7);
  print("spots: " + spots);
  for (i = 0; i <= spots; i++ ) {
    radius[i] = map(rnd_dec(), 0, 1, dimension / 6, dimension);
    m[i] = map(rnd_dec(), 0, 1, 0, 10);
    x[i] = map(rnd_dec(), 0, 1, -dimension/2, dimension/2);
    y[i] = map(rnd_dec(), 0, 1, -dimension/2, dimension/2);
  }
  centerRadius = map(rns[16], mapL, mapH, dimension/4, dimension/2);
}

function draw() {
  iC.background((mainColorH + radius1 + radius2 - 120) % 360, 5, 100);
  // iC.background(360, 5, 100);
  // iC.background(360, 255, 255, 1);

  iC.fill(mainColorH, mainColorS, mainColorB);
  iC.noStroke();

  for (i = 0; i <= spots; i++) {
    iC.fill((mainColorH + radius[i]) % 360, mainColorS, mainColorB);
    XYnoise = map(noise(m[i]), 0, 1, -dimension / 10, dimension / 10);
    iC.circle(x[i] + XYnoise, y[i] + XYnoise, radius[i]);
    m[i] += map(rns[30], mapL, mapH, 0.001, 0.02);
  }
  
    // center circle
  iC.fill((radius[1] + x[2] + y[3]) % 360, 15, 99);
  iC.circle(0, 0, centerRadius);
  
  
  pass1.shader(blurH);

  blurH.setUniform('tex0', iC);
  blurH.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurH.setUniform('direction', [1.0, 1.0]);

  pass1.rect(-dimension/2, -dimension/2, dimension, dimension); 
  
  pass2.shader(blurV);
  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurV.setUniform('direction', [1.0, 1.0]);
  
  pass2.rect(-dimension/2, -dimension/2, dimension, dimension);

  image(pass2, -dimension/2, -dimension/2, dimension, dimension);
  

  // prevka iC
  // image(iC,-dimension/2,-dimension/2, dimension, dimension);
}

function rnd_dec() {
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
}