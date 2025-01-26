// found at https://www.openprocessing.org/sketch/129166/
// and translated
/**
 This is a simple exmaple of writing on a curve. 
 Again, this is based on the Processing text tutorial
 http://www.processing.org/tutorials/text/

 The main difference is a different combination of transformations
 to put the letters in the right place. This also has an addition
 (not seen in class) that centers the text on the top of the circle.
 
 
 C. Andrews
 2014-01-20
 **/

let circles

function setup() {
  createCanvas(600, 600);
  background(255);
  textSize(48)
  smooth();
  textAlign(CENTER);
  strokeWeight(1);

  circles = [
    makeCircle({
      radius: 100,
      inc: -1,
      string: 'Bowties are cool!',
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 50,
      inc: 1,
      string: 'inside',
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 200,
      inc: -0.5,
      string: 'Some more text on the far outside',
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 150,
      inc: 10,
      string: 'Anthony\'s text',
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 40,
      inc: -4,
      string: 'POC text',
      center: {
        x: 80,
        y: 80
      }
    })
  ]
}


function draw() {
  background(255);
  circles.forEach(draw => draw())
}

const makeCircle = ({
  radius,
  inc,
  string,
  center
}) => {
  let arcOffset = 0
  return () => {
    push()
    translate(center.x, center.y);

    // current distance around the circle
    var arcLength = (PI * radius) / 2 + arcOffset;

    // total number of radians that the text will consume
    var totalAngle = textWidth(string) / radius;

    for (var i = 0; i < string.length; i++) {
      let currentvar = string.charAt(i);
      var w = textWidth(currentvar);
      // since the letters are drawn centered, we advance by half a letter width
      arcLength += w / 2;

      // use a some trig to find the angle matching this arclength
      // the totalAngle/2 just adds some additional rotation so the 
      // text starts wraps evenly around the circle
      var theta = arcLength / radius - totalAngle / 2;

      // save our current origin
      push();
      // rotate to line up with the orientation of the letter
      rotate(theta);
      // translate out avar the radius to where the letter will be drawn 
      translate(0, -radius);
      // set the fill based on which character we are on
      fill(0, 80 + 20 * i);
      // draw the character
      text(currentvar, 0, 0);
      // pop back to our origin in the middle of the circle
      // (undoing the rotate and translate)
      pop();
      // add the other half of the character width to our current position
      arcLength += w / 2;
    }

    arcOffset = arcOffset + inc % 360
    pop()
  }
}