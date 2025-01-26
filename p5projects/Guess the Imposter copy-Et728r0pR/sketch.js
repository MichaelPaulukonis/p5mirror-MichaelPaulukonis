let suspects = ["Alice", "Bob", "Charlie", "David", "Eve"];
let imposter;
let round = 0;
let statements = [
  ["I was in the library all day!", "I was at the gym.", "I was working on my project.", "I was taking a nap.", "I was out shopping."],
  ["I saw someone suspicious near the crime scene.", "I heard a loud noise around the time of the murder.", "I didn't see or hear anything unusual.", "I was with a friend, we have an alibi.", "I was at home alone."],
  ["I found a strange object near the body.", "I noticed some footprints leading away from the scene.", "I don't have any information to share.", "I saw someone running away.", "I was too far away to see anything."]
];

const gameModes = {
  HELP: 'help',
  PLAY: 'play',
  GAME_OVER: 'game_over'
}

let gameMode = gameModes.PLAY

function setup() {
  createCanvas(400, 400);
  imposter = floor(random(suspects.length));
  // imposter = random(suspects)
  // console.log("Imposter is: " + suspects[imposter]);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(220);
  
  if (suspects.length === 1) {
    text("VICTORY! The imposter was " + suspects[0] + ".", width/2, height/2);
    return;
  }
  
  text("1 person died. Who is the imposter?", width/2, 50);
  
  for (let i = 0; i < suspects.length; i++) {
    text(suspects[i] + ": " + statements[round][i], width/2, 100 + i * 50);
  }
}

function mousePressed() {
  if (mouseY <= 70 || mouseY >= 305) return
  
  let choice = floor(map(mouseY, 70, 305, 0, suspects.length));
  console.log(`Choice:  ${suspects[choice]} - ${mouseY}`);
  // debugger
  if (choice === imposter) {
    console.log("You win!");
    background(220); // Clear the canvas
    text("VICTORY", width/2, height/2);
    gameMode = gameModes.GAME_OVER
    noLoop(); // Stop the draw loop
  } else {
    console.log("Incorrect choice!");
    suspects.splice(choice, 1);
    if (suspects.includes(imposter)) {
      playSound("buzzer.mp3");
    } else {
      background(220); // Clear the canvas
      text("GAME OVER", width/2, height/2); // Display "GAME OVER"
      noLoop(); // Stop the draw loop
    }
  }
}

function playSound(file) {
  console.log("Playing sound: " + file);
}
