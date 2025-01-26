var myGif = null;
var gifLink = "https://media.giphy.com/media/xT0GqdhVFEloC84A9y/giphy.gif";

function setup() {
  // Create canvas
  createCanvas(1000, 1000);

  // ouch! loads gif EACH TIME !!!!!
  myGif = p5Gif.loadGif(gifLink, function() {
    this.loop(); //It will loop at the default position (0, 0)
    console.log(this.delay);
    //this.filter('gray');
  });
}

function draw() {
  push();
  translate(350, 350);

  pop();
}