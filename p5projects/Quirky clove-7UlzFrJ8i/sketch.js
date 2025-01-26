// p5.js logo collage
// https://discourse.processing.org/t/p5-js-logo-collage/31258

let logo;
function preload() {
    logo = loadImage("p5js.svg");
} // end preload

function setup() {
    createCanvas(1200, 680);
    noLoop();
    background(255);
    rectMode(CENTER);
    strokeWeight(2);
    stroke(0, 0, 127);
    imageMode(CENTER);
} // end setup
    
function draw() {
    translate(width / 2, height / 2);
    (new Collage(1100, 520, 4)).render();
}  // end draw
    
function Collage(w, h, level) {
    this.w = w;
    this.h = h;
    this.level = level;
    this.render = function() {
        push();
        rotate(randomGaussian(0, 1) * (QUARTER_PI / 8 + QUARTER_PI / 32));
        let r = random(128, 256);
        let b = random(128, 256);
        let g = random(128, 256);
        fill(r, b, g, 47);
        rect(0, 0, this.w, this.h);
        if (this.level > 1) { // recursive case; create 4 Collage instances
            let coeffs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            for (let i = 0; i <= 3; i++) {
                push();
                translate(coeffs[i][0] * this.w / 4, coeffs[i][1] * this.h / 4);
                (new Collage(this.w / 2, this.h / 2, this.level - 1)).render();
                pop();
            } // end for
        } else { // base case; display logo
            image(logo, 0, 0, 125, 57);
        }; // end else
        pop();
    } // end render
} // end Collage

// p5js.svg logo file from home page at https://p5js.org/
// fill="#ed225d"
// decimal: fill(237, 34, 93)