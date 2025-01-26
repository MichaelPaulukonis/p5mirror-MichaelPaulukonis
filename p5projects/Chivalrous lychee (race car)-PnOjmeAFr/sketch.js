let car = {
  x: 50,
  y: 50,
  speed: 0,
  angle: 0,
  acceleration: 0.3,
  deceleration: 0.05,
  maxSpeed: 10,
  friction: 0.04
};

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  updateCar();
  drawCar();
}

function updateCar() {
  if (keyIsDown(UP_ARROW)) {
    car.speed += car.acceleration;
  }
  if (keyIsDown(DOWN_ARROW)) {
    car.speed -= car.acceleration;
  }
  if (keyIsDown(LEFT_ARROW)) {
    car.angle -= 0.05;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    car.angle += 0.05;
  }
  console.log(`With accel: ${car.speed}`)

  car.speed *= (1 - car.friction); // Apply friction
  console.log(`With friction: ${car.speed}`)
  
  car.speed = constrain(car.speed, -car.maxSpeed, car.maxSpeed); // Constrain speed
  car.x += cos(car.angle) * car.speed; // Update position
  car.y += sin(car.angle) * car.speed;
  console.log(`With constrain: ${car.speed}`)

}

function drawCar() {
  push();
  translate(car.x, car.y);
  rotate(car.angle);
  rect(-10, -5, 20, 10); // Simple car shape
  pop();
}