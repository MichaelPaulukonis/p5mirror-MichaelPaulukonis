let dragging = false;
let selectedIndex = -1;
let dragabble = [];
const DRAG_SIZE = 30;

function addDrag(vec) {
  dragabble.push(vec);
}

function drawDrag() {
  for (let i = 0; i < dragabble.length; i++) {
    fill(selectedIndex == i ? 100 : 0);
    circle(dragabble[i].x, dragabble[i].y, DRAG_SIZE);
  }
}

function dragMousePressed() {
  findSelected();
}

function dragMouseReleased() {
  selectedIndex = -1;
}

function dragMouseDragged() {
  if (selectedIndex == -1) return;
  dragabble[selectedIndex].add(getMouseX() - getPmouseX(), getMouseY() - getPmouseY(), 0);
}

function findSelected() {
  selectedIndex = -1;
  let closest = 99999;
  const MIN_DIST = pow(DRAG_SIZE / 2, 2);
  let mX = getMouseX();
  let mY = getMouseY();
  for (let i = 0; i < dragabble.length; i++) {
    let distX = dragabble[i].x - mX;
    let distY = dragabble[i].y - mY;
    let distance = distX * distX + distY * distY;
    if (distance < closest && distance < MIN_DIST) {
      closest = distance;
      selectedIndex = i;
    }
  }
}

function getMouseX() {
  return mouseX - width / 2; //WEBGL
  //return mouseX;//P2D
}

function getMouseY() {
  return mouseY - height / 2; //WEBGL
  //return mouseY;//P2D
}

function getPmouseX() {
  return pmouseX - width / 2; //WEBGL
  //return pmouseX;//P2D
}

function getPmouseY() {
  return pmouseY - height / 2; //WEBGL
  //return pmouseY;//P2D
}