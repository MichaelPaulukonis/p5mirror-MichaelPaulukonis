let particles = [];
let zombieIndex = 0;
let perlinNoiseSeed = Math.random() * 1000;
let playfield = {};
let pause = false;
let mazeRows = 20;
let mazeCols = 20;

let CELL = {
  WALL: 1,
  PASSAGE: 0,
};

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.maze = this.createMaze(rows, cols);
  }

  createMaze(rows, cols) {
    let maze = [];
    for (let i = 0; i < rows; i++) {
      maze[i] = [];
      for (let j = 0; j < cols; j++) {
        maze[i][j] = CELL.WALL; // Initialize all cells as walls
      }
    }

    function dfs(x, y) {
      maze[x][y] = 0; // Mark current cell as visited
      let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      shuffle(directions); // Randomize directions for more varied maze patterns

      for (let i = 0; i < directions.length; i++) {
        let dx = directions[i][0];
        let dy = directions[i][1];
        let newX = x + dx * 2;
        let newY = y + dy * 2;

        if (
          newX >= 0 &&
          newX < rows &&
          newY >= 0 &&
          newY < cols &&
          maze[newX][newY] === CELL.WALL
        ) {
          maze[x + dx][y + dy] = CELL.PASSAGE; // Create a passage
          dfs(newX, newY);
        }
      }
    }

    // Start DFS from a random cell
    dfs(floor(random(rows)), floor(random(cols)));
    return maze;
  }

  isCellValid(xin, yin) {
    const x = Math.floor(xin);
    const y = Math.floor(yin);
    return (
      x >= 0 &&
      x < this.rows &&
      y >= 0 &&
      y < this.cols &&
      this.maze[x][y] === CELL.PASSAGE
    );
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.isZombie = false;
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = this.noiseOffsetX + random(1000);
    this.noiseSpeed = 0.1;
  }

  update(debug) {
    let dx = map(noise(this.noiseOffsetX), 0, 1, -this.speed, this.speed);
    let dy = map(noise(this.noiseOffsetY), 0, 1, -this.speed, this.speed);
    this.noiseOffsetX += this.noiseSpeed;
    this.noiseOffsetY += this.noiseSpeed;

    let newX = this.x + dx;
    let newY = this.y + dy;

    // Check if the new position is within the maze and not a wall
    if (playfield.isCellValid(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  display() {
    if (this.isZombie) {
      fill("red");
    } else {
      fill("yellow");
    }
    ellipse(this.x * mazeRows, this.y * mazeCols, 10);
  }
}

function setup() {
  createCanvas(400, 400);
  background(255);

  // Maze generation (using DFS for simplicity)
  playfield = new Maze(mazeRows, mazeCols);
  drawMaze(playfield.maze);

  // Create particles
  for (let i = 0; i < 100; i++) {
    let x = -1;
    let y = -1;
    while (!playfield.isCellValid(x, y)) {
      x = random(mazeRows);
      y = random(mazeCols);
    }
    particles.push(new Particle(x, y));
  }

  // Randomly select a particle to be the initial zombie
  zombieIndex = floor(random(particles.length));
  particles[zombieIndex].isZombie = true;
}

function drawMaze(maze) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === CELL.WALL) {
        fill("black");
        rect(i * mazeRows, j * mazeCols, 20, 20); // meh
      }
    }
  }
}

function draw() {
  if (pause) return;

  background("white");
  drawMaze(playfield.maze);

  for (let i = 0; i < particles.length; i++) {
    const debug = i === 5;
    particles[i].update(debug);
    particles[i].display();

    // Check for zombie infection
    if (particles[i].isZombie) {
      for (let j = 0; j < particles.length; j++) {
        if (
          i !== j &&
          dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) <
            0.5
        ) {
          particles[j].isZombie = true;
        }
      }
    }
  }
}

function keyPressed(evt) {
  if (key === " ") {
    pause = !pause;
  }

  if (keyCode === ENTER) {
    // Code to run.
  }
}
