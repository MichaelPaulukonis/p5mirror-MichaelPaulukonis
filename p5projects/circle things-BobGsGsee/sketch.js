// Animated Mandalas
// originall from https://www.openprocessing.org/sketch/541633

var circleFunc

function setup () {
    createCanvas(700, 700);
    background(255, 255, 255);
    noFill();
    stroke(0, 40);
    circleFunc = random(circles)
}

function draw () {
    let t = frameCount;
    // move the coordinate system to left middle
    translate(width / 2, height / 2);
    circleFunc(t)
}

const circles = [
    (t) => { ellipse(sin(t / 100) * 100, cos(t / 100) * 100, 50, 50) }, // circles left to right on a cos() wave
    (t) => { ellipse(sin(t / 50) * 100, cos(t / 50) * 100, 50, 50) },
    (t) => { ellipse(sin(t / 50) * 50, cos(t / 50) * 100, 50, 50) },
    (t) => { ellipse(sin(t / 50) * 100, cos(t / 50) * 50, 50, 50) },
    (t) => { ellipse(sin(t / 50) * 50, cos(t / 50) * 50, 50, 50) },
    (t) => { ellipse(sin(t / 10) * 50, cos(t / 50) * 50, 50, 50) },
    (t) => { ellipse(sin(t / 10) * 200, cos(t / 50) * 200, 100, 100) },
    (t) => { ellipse(sin(t / 63) * 200, cos(t / 13) * 200, 100, 100) },
    (t) => { ellipse(sin(t / 50) * 50 + t, cos(t / 50) * 50, 50, 50) },
    (t) => { ellipse(sin(t / 50) * (50 + t), cos(t / 50) * 50, 50, 50) },
    (t) => { ellipse(sin(t / 50) * t, cos(t / 50) * t, 50, 50) }, // spiral
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), 50, 50) }, // slow spiral
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), t, t) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), t / 2, t / 2) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), t / sin(t), t / sin(t)) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), t / sin(t), t / cos(t)) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), t / tan(t), t / cos(t)) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), tan(t), t / cos(t)) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), sin(t) * 20, cos(t)) },
    (t) => { ellipse(sin(t / 50) * (t / 10), cos(t / 50) * (t / 10), sin(t) * 40, 40) },
    (t) => { ellipse(sin(t / 50) * (t / 5), cos(t / 50) * (t / 5), sin(t) * 100, 100) },
    (t) => { ellipse(sin(t / 50) * (t / 5), cos(t / 50) * (t / 5), sin(t) * 30, 100) }
]