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

let gameMode = gameModes.PLAY;
let suspectSprites = [];

function setup() {
  createCanvas(400, 400);
  imposter = floor(random(suspects.length));
  textAlign(CENTER, CENTER);
  textSize(20);

  // Create sprite for each suspect
  for (let i = 0; i < suspects.length; i++) {
    let sprite = createSprite(width / 2, 100 + i * 50);
    sprite.text = suspects[i]
    // sprite.addImage(loadImage("path/to/suspect_image.png")); // Replace with actual image
    sprite.mouse.pressing()
    sprite.onMousePressed = () => checkChoice(i);
    suspectSprites.push(sprite);
  }
}

function draw() {
  background(220);

  if (suspects.length === 1) {
    text("VICTORY! The imposter was " + suspects[0] + ".", width / 2, height / 2);
    return;
  }

  text("1 person died. Who is the imposter?", width / 2, 50);

  // for(let sprite of suspectSprites) {
  for(let i = 0; i < suspectSprites.length; i++) {
    if (suspectSprites[i].mouse.pressing()) {
      console.log(i)
      checkChoice(i)
    }
  }
  
  // Display suspect names
  // for (let i = 0; i < suspects.length; i++) {
  //   text(suspects[i], width / 2, 100 + i * 50);
  // }

  // Draw sprites
  // drawSprites();
}

function checkChoice(choice) {
  if (choice === imposter) {
    console.log("You win!");
    background(220);
    text("VICTORY", width / 2, height / 2);
    gameMode = gameModes.GAME_OVER;
    noLoop();
  } else {
    console.log("Incorrect choice!");
    // suspects.splice(choice, 1);
    // if (suspects.includes(imposter)) {
    //   playSound("buzzer.mp3");
    // } else {
    //   background(220);
    //   text("GAME OVER", width / 2, height / 2);
    //   noLoop();
    // }
  }
}

function playSound(file) {
  console.log("Playing sound: " + file);
}
