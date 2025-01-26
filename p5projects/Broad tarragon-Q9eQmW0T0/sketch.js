function setup() {
  createCanvas(400, 400);
}

function draw() {
  let keys = []
  if (keyIsDown(SHIFT)) {
    keys.push("SHIFT!");
  }
  if (keyIsDown(LEFT_ARROW)) {
     keys.push("LEFT!");
  }
  if (keys.length > 0) console.log(keys.join(' '))
}
