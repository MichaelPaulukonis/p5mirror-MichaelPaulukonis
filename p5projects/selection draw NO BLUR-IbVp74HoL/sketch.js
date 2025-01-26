this.focus();

let elementImages = [];
let selectionRect = {
  x: 0,
  y: 0,
  x2: 0,
  y2: 0,
};
let painted;
let cnvs;
let selectedFragment;
const activityModes = {
  Selecting: "select",
  Drawing: "draw",
};
let activity = activityModes.Selecting;

function preload() {
  for (let i = 0; i < 2; i++) {
    let fname = `images/nancy.${i.toString().padStart(2, "0")}.jpg`;
    elementImages[i] = loadImage(fname);
  }
}

function setup() {
  cnvs = createCanvas(600, 600);
  density = pixelDensity();
  console.log(`density: ${density}`);
  painted = createImage(width * density, height * density);
  // painted = createImage(width, height);

  image(elementImages[0], 0, 0);
  captureDrawing();
  rectMode(CORNERS);
  noFill();
}

function draw() {
  if (mouseIsPressed) {
    switch (activity) {
      case activityModes.Selecting:
        selectionRect.x2 = mouseX;
        selectionRect.y2 = mouseY;
        render()
        rect(
          selectionRect.x,
          selectionRect.y,
          selectionRect.x2,
          selectionRect.y2
        );
        break;

      case activityModes.Drawing:
        image(selectedFragment, mouseX, mouseY);
        captureDrawing();
        // https://stackoverflow.com/questions/69171227/p5-image-from-get-is-drawn-blurry-due-to-pixeldensity-issue-p5js
        break;
    }
  } else if (activity === activityModes.Drawing) {
    render()
    image(selectedFragment, mouseX, mouseY);
  }
}

const captureDrawing = () => {
  painted.copy(cnvs, 0, 0, width, height, 0, 0, width * density, height * density);
};

const render = () => {
  image(painted, 0, 0, width, height);
}

function mousePressed() {
  if (activity === activityModes.Selecting) {
    selectionRect.x = mouseX;
    selectionRect.y = mouseY;
  }
}

function mouseReleased() {
  if (activity === activityModes.Selecting) {
    render()

    const sfw = selectionRect.x2 - selectionRect.x;
    const sfh = selectionRect.y2 - selectionRect.y;

    selectedFragment = createImage(sfw, sfh);
    selectedFragment.copy(
      cnvs,
      selectionRect.x,
      selectionRect.y,
      sfw,
      sfh,
      0,
      0,
      sfw,
      sfh
    );

    selectionRect = {
      x: 0,
      y: 0,
      x2: 0,
      y2: 0,
    };
  }
}

function keyTyped() {
  if (key === "s") {
    render()
    activity = activityModes.Selecting;
    stroke("black");
    strokeWeight(2);
  } else if (key === "d") {
    activity = activityModes.Drawing;
  }

  return false;
}
