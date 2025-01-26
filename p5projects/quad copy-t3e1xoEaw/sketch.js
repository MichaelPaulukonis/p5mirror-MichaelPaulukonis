let img;
let vecTL, vecTR, vecBL, vecBR;

function preload(){
	img = loadImage("https://openprocessing-usercontent.s3.amazonaws.com/files/user65884/visual842202/he6128441d41d0d8183206c127e7ee065/griduv.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	
	let size = min(height, width) * 0.4;
	vecTL = createPoint(-size, -size);//TOP LEFT
	vecTR = createPoint(size, -size);//TOP RIGHT
	vecBR = createPoint(size, size);//BOTTOM LEFT
	vecBL = createPoint(-size, size);//BOTTOM RIGHT
}

function createPoint(x, y){
	let vec = createVector(x, y);
	addDrag(vec);
	return vec;
}

function draw() {
  background(255);
  
  texture(img);
  quad(vecTL.x, vecTL.y, vecTR.x, vecTR.y, vecBR.x, vecBR.y, vecBL.x, vecBL.y);
	
  drawDrag();
}
 
function mousePressed() {
  dragMousePressed();
}
 
function mouseReleased() {
  dragMouseReleased();
}
 
function mouseDragged() {
  dragMouseDragged();
}