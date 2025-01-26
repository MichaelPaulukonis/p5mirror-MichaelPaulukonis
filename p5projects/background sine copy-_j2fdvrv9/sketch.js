function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(128+(sin(frameCount*0.01)*128),
    128+(sin(frameCount*0.02)*128),
    128+(sin(frameCount*0.03)*128)
  );
}