// https://discourse.processing.org/t/how-to-add-text-inside-circle-or-any-other-shapes-in-p5-js/20092
// Uses P5.js for canvas creation and drawing
function setup() {
  let   circles = [],
        circle = {},
        overlapping = false,
        counter = 0;
  const NumCircles = 200,
        protection = 10000,
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;
        texts = ["A", "B", "C", "D", "E"];

  createCanvas(canvasWidth, canvasHeight);

  // populate circles array
  // brute force method continues until # of circles target is reached
  // or until the protection value is reached
  while (circles.length < NumCircles &&
         counter < protection) {
    circle = {
      x: random(width),
      y: random(height),
      r: random(3, 100),
      text: texts[Math.floor(Math.random() * texts.length)]
    };
    overlapping = false;
    
    // check that it is not overlapping with any existing circle
    // another brute force approach
    for (let i = 0; i < circles.length; i++) {
      var existing = circles[i];
      var d = dist(circle.x, circle.y, existing.x, existing.y)
      if (d < circle.r + existing.r) {
        // They are overlapping
        overlapping = true;
        // do not add to array
        break;
      }
    }
    
    // add valid circles to array
    if (!overlapping) {
      circles.push(circle);      
    }
    
    counter++;
  }
  
  // circles array is complete
  // draw canvas once
  noStroke();
  textAlign(CENTER, CENTER);
  for (let i = 0; i < circles.length; i++) {
    fill("#2AC1A6");
    ellipse(circles[i].x, circles[i].y, 
            circles[i].r*2, circles[i].r*2);
    fill("#FFFFFF");
    textSize(circles[i].r);
    text(circles[i].text, circles[i].x, circles[i].y);
  }
}