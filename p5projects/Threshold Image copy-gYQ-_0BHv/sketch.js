// The source image
let img;

// A new image where we will hold threshold data
let threshImg;

// The threshold value. Pixels brighter than this will be white
// Pixels less thatn this value will be black
let threshold = 60;


// Load the image
function preload() {
  img = loadImage("flowers.jpg");
}

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Create a new set of image data
  threshImg = createImage(width, height);

  // Resize the image to fit the canvas
  img.resize(width, height);
  
 
  // Loop through the pixels X and Y
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      // Get the pixel color at (x, y)
      const pixel = img.get(x, y);

      // Get the brightness value of the pixel
      const gray = brightness(pixel);
   
      // If the pixel is greater than the threshold, return white, otherwise return black
      if (gray > threshold) {
        threshImg.set(x, y, color(255, 255));
      } else {
        threshImg.set(x, y, color(0, 255));
      }

    }
  }
  
    // We're finished working with pixels so update them
  threshImg.updatePixels();
}

function draw() {

  // Draw the threshold
  image(threshImg, 0, 0);


}