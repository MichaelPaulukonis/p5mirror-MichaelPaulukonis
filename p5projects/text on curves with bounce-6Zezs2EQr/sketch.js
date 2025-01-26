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
  background(0);
  textSize(48)
  smooth();
  textAlign(CENTER);
  strokeWeight(1);

  circles = [
    makeCircle({
      radius: 100,
      increment: -1,
      string: 'Bowties are cool!',
      color: color('#0f0'),
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 50,
      increment: 1,
      string: 'inside',
      color: color('teal'),
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 200,
      increment: -0.5,
      string: 'Some more text on the far outside',
      color: color('magenta'),
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 150,
      increment: 10,
      string: 'Anthony\'s text',
      color: color('#ff0'),
      center: {
        x: width / 2,
        y: height / 2
      }
    }),
    makeCircle({
      radius: 40,
      increment: -4,
      string: 'POC text',
      color: color('blue'),
      center: {
        x: 80,
        y: 80
      },
      modifier: bouncer()
    })
  ]
}

const bouncer = () => {
  let xDirection = 1
  let yDirection = 1
  let xSpeed = 2.8
  let ySpeed = 1.5
  return ({
    center,
    radius
  }) => {
    // 'bounce' at edges, or something
    // reverse direction
    center.x = center.x + xSpeed * xDirection
    center.y = center.y + ySpeed * yDirection

    if (center.x > width - radius || center.x < radius) {
      xDirection *= -1
    }
    if (center.y > height - radius || center.y < radius) {
      yDirection *= -1
    }
  }
}

function draw() {
  background(0);
  circles.forEach(c => c.update())
}

const makeCircle = ({
  radius,
  increment,
  string,
  color,
  center,
  modifier = () => {}
}) => {
  let arcOffset = 0

  let circle = {
    arcOffset,
    radius,
    increment,
    center,
    color,
    string,
    modifier,
    update: function() {
      modifier(this)
      push()
      translate(center.x, center.y);

      // current distance around the circle
      var arcLength = (PI * radius) / 2 + arcOffset;

      // total number of radians that the text will consume
      var totalAngle = textWidth(string) / radius;
      fill(color)
      
      for (var i = 0; i < string.length; i++) {
        let currentvar = string.charAt(i);
        var w = textWidth(currentvar);
        // since the letters are drawn centered, we advance by half a letter width
        arcLength += w / 2;

        // use a some trig to find the angle matching this arclength
        // the totalAngle/2 just adds some additional rotation so the 
        // text starts wraps evenly around the circle
        var theta = arcLength / radius - totalAngle / 2;

        push();
        // rotate to line up with the orientation of the letter
        rotate(theta);
        translate(0, -radius);
        // fill(0, 80 + 20 * i);
        text(currentvar, 0, 0);
        pop();
        // add the other half of the character width to our current position
        arcLength += w / 2;
      }

      arcOffset = arcOffset + increment % 360
      pop()
    }
  }

  return circle
}