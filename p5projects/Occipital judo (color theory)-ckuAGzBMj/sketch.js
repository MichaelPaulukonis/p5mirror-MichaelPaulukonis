let img;

function preload() {
  img = loadImage('nancy.00.jpg');
}

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  image(img, 0, 0, width, height);
  
  // Extract the dominant colors
  let colors = getDominantColors(img, 14);
  
  // Display the color scheme
  push();
  translate(10, 10);
  let sq = ((width - 10 - colors.length * 10) / colors.length)
  sq = sq <= 40 ? sq : 40
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(i * (sq + 10), 0, sq, sq);
  }
  pop();
}

function getDominantColors(img, numColors, colorDistance = 20) {
  // Resize the image to a smaller size to speed up the analysis
  const sm = 5
  img.resize(sm, sm);
  
  // Get the pixel data
  img.loadPixels();
  let pixels = img.pixels;
  
  // Create a histogram of the pixel colors
  let histogram = {};
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    
    // Group similar colors together
    let key = `${Math.round(r / colorDistance) * colorDistance},${Math.round(g / colorDistance) * colorDistance},${Math.round(b / colorDistance) * colorDistance}`;
    if (histogram[key]) {
      histogram[key]++;
    } else {
      histogram[key] = 1;
    }
  }
  
  // Sort the histogram by frequency and get the top numColors colors
  let sortedColors = Object.entries(histogram)
    .sort((a, b) => b[1] - a[1])
    .slice(0, numColors)
    .map(entry => {
      let [r, g, b] = entry[0].split(',').map(Number);
      return color(r, g, b);
    });
  
  return sortedColors;
}

function getDominantColors_orig(img, numColors) {
  // Resize the image to a smaller size to speed up the analysis
  img.resize(10, 10);
  
  // Get the pixel data
  img.loadPixels();
  let pixels = img.pixels;
  
  // Create a histogram of the pixel colors
  let histogram = {};
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    let key = `${r},${g},${b}`;
    // console.log(key)
    if (histogram[key]) {
      histogram[key]++;
    } else {
      histogram[key] = 1;
    }
  }
  console.log(JSON.stringify(histogram))
  // Sort the histogram by frequency and get the top numColors colors
  let sortedColors = Object.entries(histogram)
    .sort((a, b) => b[1] - a[1])
    .slice(0, numColors)
    .map(entry => {
      console.log(`entry: ${entry}`)
      let [r, g, b] = entry[0].split(',').map(Number);
      console.log(r,g,b)
      return color(r, g, b);
    });
  console.log(JSON.stringify(sortedColors))
  return sortedColors;
}
