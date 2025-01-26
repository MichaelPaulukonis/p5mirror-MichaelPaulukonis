// This was for something of Anthony's

let towerTypes = [
  { icon: '😃', damage: 1, value: 5 },
  { icon: '😉', damage: 5, value: 7 },
  { icon: '😏', damage: 10, value: 9 },
  { icon: '😱', damage: 15, value: 20 },
  { icon: '🤬', damage: 25, value: 30 }
]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawTowerButtons(8)
}

function drawTowerButtons (money) {
  textSize(32)
  textAlign(CENTER, CENTER)
  for (let i = 0; i < towerTypes.length; i++) {
    let x = 20 + i * 50
    let y = 300
    let tower = towerTypes[i]
    if (tower.value <= money) {
      fill(0, 255)
    } else {
      fill(0, 100)
    }
    text(tower.icon, x, y)
  }
  // fill(0, 255)
}