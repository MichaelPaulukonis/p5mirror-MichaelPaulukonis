/*
 * Challenge: Draw a circle with only rectangles.
 *            No ellipse, no sin/cos, no Math libraries.
 */

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(33);
  
  fill(255);
  stroke(0);
  draw_circle(width * 0.25, height * 0.25, 70, 0.06);
  
  noStroke();
  draw_circle(width * 0.75, height * 0.25, 70, 1);

  stroke(0);
  draw_circle(width * 0.5, height * 0.7, 100, 0.3);
}

function draw_circle(x, y, radius, resolution) {
  rectMode(CENTER);
  const tile_size = (radius * 2) / (radius * 2 * resolution);
  const tile_count = ~~((radius * 2) / tile_size);
  for (let tile_y = 0; tile_y < tile_count; ++tile_y) {
    for (let tile_x = 0; tile_x < tile_count; ++tile_x) {
      const pos_x = (tile_x - tile_count / 2 + 0.5) * tile_size;
      const pos_y = (tile_y - tile_count / 2 + 0.5) * tile_size;
      if (pos_x ** 2 + pos_y ** 2 < radius ** 2) // Math.hypot(pos_x, pos_y) < radius
	      square(x + pos_x, y + pos_y, tile_size);
    }
  }
}