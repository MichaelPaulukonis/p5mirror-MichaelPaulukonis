let img;

function preload(){
   // load our image
   img = loadImage("flowers.jpg");
}

function setup() {
  createCanvas(400, 400);
}


function draw() {
  
  // Draw one image at full size at (0,0);
  image(img, 0, 0, width, height);
  
  // Reduce the number of colors to 3 per channel
  filter(POSTERIZE, 3);

}