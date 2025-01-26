// type 'r' to reverse playback direction
// IF and ONLY if you have 'twice' selected
// the picture and drag-speed are incidental to the issue at hand
// created as an example for https://github.com/processing/p5.js-sound/issues/236

https://github.com/processing/p5.js-sound/issues/236#issuecomment-569181312

var tiger
var gogs
var audioLength
var direction = 1
var radio

function preload() {
  gogs = loadImage('assets/picasso.gogs.jpg')
  tiger = loadSound('assets/Damscray_DancingTiger.mp3');
}

function setup() {
  radio = createRadio();
  radio.option('once');
  radio.option('twice');
  
  // default to "error" condition
  radio.value('once')
  
  createCanvas(gogs.width, gogs.height);

  audioLength = tiger.duration()
  tiger.playMode('restart')
  tiger.setLoop(true)
  tiger.play()

  image(gogs, 0, 0)
}


const setSpeed = () => {
  let speed = map(mouseY, 0.1, height, 2, 0);
  speed = constrain(speed, 0.01, 4) * direction
  console.log(direction, speed)
  tiger.rate(speed);
  if (radio.value() === 'twice') {
    tiger.rate(speed) // weird. reversing TWICE does the trick. ?????
  }
}

function mouseDragged() {
  setSpeed()
}

function keyTyped() {
  if (key === 'j') {
    tiger.jump(random(audioLength))
  } else if (key === 'r') {
    direction *= -1
    setSpeed()
  }
}