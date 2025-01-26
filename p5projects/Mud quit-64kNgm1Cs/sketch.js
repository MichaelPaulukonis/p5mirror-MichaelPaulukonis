let vertices = [{"isPInst":true,"x":177,"y":138,"z":0},{"isPInst":true,"x":72,"y":353,"z":0},{"isPInst":true,"x":340,"y":259,"z":0}]

function isPointInPolygon(polygon, px, py) {
  let isInside = false;
  let j = polygon.length - 1;

  for (let i = 0; i < polygon.length; j = i++) {
    const x1 = polygon[i].x;
    const y1 = polygon[i].y;
    const x2 = polygon[j].x;
    const y2 = polygon[j].y;

    const intersect = ((y1 > py) !== (y2 > py)) &&
                      (px < (x2 - x1) * (py - y1) / (y2 - y1) + x1);

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}

function setup() {
  background('white')
  stroke('black')
  createCanvas(400,400)
}

function draw() {
  clear();
  background('white')
  
  // Draw your shape
  beginShape();
  for (const vtx of vertices) {
    vertex(vtx.x, vtx.y);
  }
  endShape(CLOSE);

  // Check if the mouse cursor is inside the shape

  // Change the cursor based on the result
  if (isPointInPolygon(vertices, mouseX, mouseY)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
