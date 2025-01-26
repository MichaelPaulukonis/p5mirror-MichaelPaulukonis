/**
  This was originally a sketch I attempted to do in Firefox HTML
  and vanilla-js back in 2014
  playback rate in the audio API didn't seem to work to well, then
  Or I didn't work too well with it.
  Several days of frustrated poking at it and I gave up,
  never publishing the sketch to the web, only in GitHub
  
  I got it working in a matter of minutes in p5js
  Added the filter, reverse-play and random-jumping
  AND creating a stripped-down version demonstrating a bug
  with the p5.SoundFile.rate() all in hunder 90 minutes tonight.
  
  Boo-yah for p5js!!!
  
  audio-track: https://en.wikipedia.org/wiki/Pablo_Picasso_(song)

**/

var pablo
var gogs
var audioLength
var filt
var direction = 1
var setFreq
var started = false

function preload() {
  gogs = loadImage('assets/picasso.gogs.jpg')
  pablo = loadSound('assets/pablo.02.mp3');
}

function setup() {
  createCanvas(gogs.width, gogs.height); // 600 height
  filt = new p5.BandPass();
  setFreq = phlanger()
  setFreq(width / 2)
  pablo.playMode('restart')
  pablo.setLoop(true)
  setSpeed(height / 2) // can't iniate with reversed direction. AAARGH
  audioLength = pablo.duration()
  pablo.jump(random(audioLength))
  pablo.disconnect()
  pablo.connect(filt)
  imageMode(CENTER)
}

const setSpeed = (y = mouseY) => {
  let speed = map(y, 0.1, height, 2, 0);
  speed = constrain(speed, 0.01, 4) * direction
  pablo.rate(speed);
  pablo.rate(speed); // weird. reversing TWICE does the trick. ?????
}

// not a flanger - it changes the width of the bandpass
const phlanger = () => {
  let res = 20
  let inc = 0.01
  let dir = -1
  var lastX = 50
  return (x = lastX) => {
    let freq = map(x, 0, width, 20, 10000);
    filt.freq(freq);
    // give the filter a narrow band (lower res = wider bandpass)
    filt.res(res);
    res += inc * dir
    if (res <= 2 || res >= 50) {
      dir *= -1
    }
  }
}

function draw() {
  if (getAudioContext().state !== 'running' && !started) {
    background('#fff')
    textAlign(CENTER)
    textStyle(BOLD)
    textSize(48)
    text('CLICK TO PLAY', width / 2, height / 2)
  } else if (!started) {
    started = true
    image(gogs, width / 2, height / 2)
  } else {
    setFreq()
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running' && !started) {
    console.log('inside')
    getAudioContext().resume();
    started = true
    image(gogs, width / 2, height / 2)
    setFreq()
  }
}

function mouseDragged() {
  if (!started) {
    return
  }

  setSpeed(mouseY)
  setFreq(mouseX)
}

function keyTyped() {
  if (!started) {
    return
  }

  if (key === 'j') {
    pablo.jump(random(audioLength))
  } else if (key === 'r') {
    direction *= -1
    setSpeed(mouseY)
  }
}