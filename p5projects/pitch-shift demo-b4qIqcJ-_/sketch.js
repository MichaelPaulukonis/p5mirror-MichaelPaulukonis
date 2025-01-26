/* PDM Course: Sound Unit

Example of Tone.js PitchShift Effect

Code by Anthony T. Marasco [2018]
*/

// originally from Originally from https://codepen.io/lsuddem/pen/RJEYLr


let player;

let shifter;
let button;
let shiftSlider;
let rateSlider;
let windowSlider;
let presets = []
let wetMix;

let baseURL = "https://s3-us-west-1.amazonaws.com/leesamples/samples/";

function preload() {

  /*Here is where we build our audio effect, and connect its output directly to the master output */
  shifter = new Tone.PitchShift(2).toMaster();
  shifter.windowSize = 0.03

  /* Here is where we build our Samplers and connect their outputs to the input of the audio effect. We do this using the .connect() method, and passing in the variable name of the effect we want to connect to*/

  // player = new Tone.Player(baseURL + "Hits/BBQ+Lid+Hit.mp3").connect(shifter);

  // player = new Tone.Player("sequencer.wav").connect(shifter);
  // player = new Tone.Player("audio/press_five.wav").connect(shifter);
  // player = new Tone.Player("audio/macbeth__tomorrow-voice.mp3").connect(shifter);
  player = new Tone.Player("audio/countdown-from-10-male-voice.mp3").connect(shifter);
  // player = new Tone.Player("audio/indian-children-street-voices.mp3").connect(shifter);
  // player = new Tone.Player("audio/204911__unfa__voices.mp3").connect(shifter);

  player.loop = true

  presets.push({
      shift: 0,
      rate: 1,
      window: 0.1
    }, {
      shift: 20,
      rate: 0.1,
      window: 0.01
    }, {
      shift: 20,
      rate: 0.02,
      window: 0.5
    }, {
      shift: 10,
      rate: 0.02,
      window: 0.01
    }

  )

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255);

  let preset = presets[3]

  wetMix = createSlider(0, 1, 1, 0);
  wetMix.style("width", "200px");
  wetMix.position(width / 2 - 100, height / 2);

  shiftSlider = createSlider(-120, 120, preset.shift, 1);
  shiftSlider.style("width", "200px");
  shiftSlider.position(width / 2 - 100, height / 2 + 70);

  rateSlider = createSlider(0.01, 1, preset.rate, 0.01)
  rateSlider.style("width", "200px");
  rateSlider.position(width / 2 - 100, height / 2 + 140);

  windowSlider = createSlider(0.01, 4, preset.window, 0.01)
  windowSlider.style("width", "200px");
  windowSlider.position(width / 2 - 100, height / 2 + 200);

  button = createButton("Play Sound");
  button.position(width / 2 - 50, height / 2 - 100);
  button.mousePressed(play1);
}

function draw() {
  /*Avoiding putting any sound triggering functions in draw() for this example
   */

  shifter.wet.value = wetMix.value();
  shifter.pitch = shiftSlider.value();
  shifter.windowSize = windowSlider.value()
  player.playbackRate = rateSlider.value()

  background(143, 204, 124);

  textSize(17);
  text("PitchShift Example", width / 2, height / 2 - 200);

  textSize(10);
  text(int(wetMix.value() * 100) + "% effected sound", wetMix.x + 100, wetMix.y - 10);

  text("Shift value parameter: " + shiftSlider.value() + " half steps", shiftSlider.x + 100, shiftSlider.y - 25);

  text(`Playback rate: ${rateSlider.value()}`, rateSlider.x + 100, rateSlider.y - 15)

  text(`Windowsize: ${windowSlider.value()}`, windowSlider.x + 100, windowSlider.y - 15)

}

function play1() {
  player.start();
}