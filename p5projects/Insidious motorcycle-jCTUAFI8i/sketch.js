let img; // Variable to store the image
let sx = 0; // X-coordinate for the top left corner of the section
let sy = 0; // Y-coordinate for the top left corner of the section
let section = null;
let direction = null;
// Initialize noise offsets for x and y directions
let noiseOffsetX = 0;
let noiseOffsetY = 1000; // Start at a different position to ensure x and y vary differently
let noiseOffsetSize = 2000;
const minSectionSize = 10;
var maxSectionSize;

function preload() {
  let files = [
    "basquiat.warhol.00.jpeg",
    "basquiat.warhol.01.jpg",
    "basquiat.warhol.02.avif",
    "basquiat.warhol.03.jpg",
    "basquiat.warhol.04.webp",
    "basquiat.warhol.05.jpeg",
    
    // "newspaper.00.webp",
    // "newspaper.01.jpg",
    // "newspaper.02.jpg",
    // "newspaper.03.jpg",
    // "newspaper.04.jpg",
    
    
    // "mona-lisa-6195291.png",
    // "polychrome.text.20240503.131611.png",
    // "polychrome.text.20240509.142845.png",
    // "hindle.texture.jpg"
  ]
  img = loadImage(random(files))
  // img = loadImage("mona-lisa-6195291.png");
  // img = loadImage("polychrome.text.20240503.131611.png");
  // img = loadImage("polychrome.text.20240509.142845.png");
  // img = loadImage("hindle.texture.jpg");
}

function setup() {
  createCanvas(400, 400);
  direction = createVector(0.5, 0.5);
  section = createVector(Math.floor(img.width / 2), Math.floor(img.height / 2));
  frameRate(8);
  maxSectionSize = width / 4; // Assuming width and height are equal, otherwise use min(width, height) / 4
}

function draw() {
  background(220);

  // Use Perlin noise to smoothly vary the section size
  const sectionSize = Math.floor(
    map(noise(noiseOffsetSize), 0, 1, minSectionSize, maxSectionSize)
  );

  // Use Perlin noise to update section position for a more natural movement
  section.x = Math.floor(
    map(noise(noiseOffsetX), 0, 1, 0, img.width - sectionSize)
  );
  section.y = Math.floor(
    map(noise(noiseOffsetY), 0, 1, 0, img.height - sectionSize)
  );

  // // Display the section of the image in a grid
  // for (let x = 0; x < width; x += sectionSize) {
  //   for (let y = 0; y < height; y += sectionSize) {
  //     image(
  //       img,
  //       x,
  //       y,
  //       sectionSize,
  //       sectionSize,
  //       section.x,
  //       section.y,
  //       sectionSize,
  //       sectionSize
  //     );
  //   }
  // }
  for (let x = 0; x < width; x += sectionSize * 2) {
    // Multiply by 2 to cover half the canvas width per iteration
    for (let y = 0; y < height; y += sectionSize * 2) {
      // Same for height
      // Top-left quadrant (normal)
      image(
        img,
        x,
        y,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize,
        sectionSize
      );

      // Top-right quadrant (left-right flipped)
      push();
      translate(x + sectionSize * 2, y); // Move origin to the right edge of the current section
      scale(-1, 1); // Flip horizontally
      image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize,
        sectionSize
      );
      pop();

      // Bottom-left quadrant (up-down flipped)
      push();
      translate(x, y + sectionSize * 2); // Move origin to the bottom edge of the current section
      scale(1, -1); // Flip vertically
      image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize,
        sectionSize
      );
      pop();

      // Bottom-right quadrant (left-right and up-down flipped)
      push();
      translate(x + sectionSize * 2, y + sectionSize * 2); // Move origin to the bottom right corner of the current section
      scale(-1, -1); // Flip both horizontally and vertically
      image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize,
        sectionSize
      );
      pop();
    }
  }

  // Increment noise offsets for the next frame
  noiseOffsetX += 0.01;
  noiseOffsetY += 0.01;
  noiseOffsetSize += 0.001;
}

function keyPressed() {
  // Save the canvas when "s" is pressed
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "png");
  }
}
