/**
Create a p5.js version of "boids" where the boids are text-based. The code will be hosted on editor.p5.js, so no html scaffolding is required. The sketch should use p5's "instance mode", and a class-based implementation of a Boid. It should also implement the following ideas:

Frequency-Based Attraction/Repulsion: Boids representing more frequent characters are attracted to each other, while less frequent characters repel each other.

Word Formation: Boids attempt to form words from the input text. When they collide, they check if they can form a valid word and stay together if they can.

Sentence Reconstruction: Boids try to reconstruct sentences from the input text. They are attracted to boids that can help form the next word in the sentence.

Color-Coded Frequency: Boids change color based on the frequency of their character in the input text. More frequent characters are brighter, and less frequent characters are darker. This visual cue helps identify clusters of frequent and infrequent characters.
**/

  
let sketch = (p) => {
  let isPaused = false;
  let boids = [];
  // text from https://www.gutenberg.org/cache/epub/74335/pg74335.txt
  let inputText = `The wise men tell us that the world is growing happier—that we live
longer than did our fathers, have more of comfort and less of toil,
fewer wars and discords, and higher hopes and aspirations. So say the
wise men; but deep in our own hearts we know they are wrong. For were
not we, too, born in Arcadia, and have we not—each one of us—in that
May of life when the world was young, started out lightly and airily
along the path that led through green meadows to the blue mountains
on the distant horizon, beyond which lay the great world we were to
conquer? And though others dropped behind, have we not gone on through
morning brightness and noonday heat, with eyes always steadily forward,
until the fresh grass began to be parched and withered, and the way
grew hard and stony, and the blue mountains resolved into gray rocks
and thorny cliffs? And when at last we reached the toilsome summits, we
found the glory that had lured us onward was only the sunset glow that
fades into darkness while we look, and leaves us at the very goal to
sink down, tired in body and sick at heart, with strength and courage
gone, to close our eyes and dream again, not of the fame and fortune
that were to be ours, but only of the old-time happiness that we have
left so far behind.

As with men, so is it with nations. The lost paradise is the world’s
dreamland of youth. What tribe or people has not had its golden age,
before Pandora’s box was loosed, when women were nymphs and dryads and
men were gods and heroes? And when the race lies crushed and groaning
beneath an alien yoke, how natural is the dream of a redeemer, an
Arthur, who shall return from exile or awake from some long sleep to
drive out the usurper and win back for his people what they have lost.
The hope becomes a faith and the faith becomes the creed of priests and
prophets, until the hero is a god and the dream a religion, looking to
some great miracle of nature for its culmination and accomplishment.
The doctrines of the Hindu avatar, the Hebrew Messiah, the Christian
millennium, and the Hesûnanin of the Indian Ghost dance are essentially
the same, and have their origin in a hope and longing common to all
humanity.`.replace(/\n/g, ' ')
  let charFrequency = {};
  let wordList = inputText.split(" ");
  let sentence = inputText.split(" ");

  class Boid {
    constructor(char, x, y) {
      this.char = char;
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acceleration = p.createVector(0, 0);
      this.maxSpeed = 2;
      this.maxForce = 0.05;
      this.color = this.getColorBasedOnFrequency();
    }

    getColorBasedOnFrequency() {
      let freq = charFrequency[this.char] || 1;
      let brightness = p.map(
        freq,
        1,
        p.max(Object.values(charFrequency)),
        100,
        255
      );
      return p.color(brightness);
    }

    applyForce(force) {
      this.acceleration.add(force);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    display() {
      p.fill(this.color);
      p.textSize(16);
      p.text(this.char, this.position.x, this.position.y);
    }

    edges() {
      if (this.position.x > p.width) this.position.x = 0;
      if (this.position.x < 0) this.position.x = p.width;
      if (this.position.y > p.height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = p.height;
    }

    attractOrRepel(boids) {
      for (let other of boids) {
        if (other !== this) {
          let distance = p5.Vector.dist(this.position, other.position);
          let freqDiff = charFrequency[this.char] - charFrequency[other.char];
          let force = p5.Vector.sub(other.position, this.position);
          if (freqDiff > 0) {
            force.mult(0.01);
          } else {
            force.mult(-0.01);
          }
          this.applyForce(force);
        }
      }
    }

    combine(boids) {
      for (let other of boids) {
        if (
          other !== this &&
          p5.Vector.dist(this.position, other.position) < 10
        ) {
          this.char += other.char;
          boids.splice(boids.indexOf(other), 1);
        }
      }
    }
  }

  p.setup = () => {
    p.createCanvas(800, 600);
    calculateCharFrequency();
    createBoids();
  };

  p.keyPressed = () => {
    if (p.key === " ") {
      isPaused = !isPaused;
    }
  };

  p.draw = () => {
    if (isPaused) return;
    p.background(220);
    for (let boid of boids) {
      boid.attractOrRepel(boids);
      boid.update();
      boid.edges();
      boid.display();
      boid.combine(boids);
    }
  };

  // yeah, this isn't right. And doesn't work for combinations
  function calculateCharFrequency() {
    for (let char of inputText) {
      if (char !== " ") {
        if (!charFrequency[char]) {
          charFrequency[char] = 0;
        }
        charFrequency[char]++;
      }
    }
  }

  function createBoids() {
    for (let char of inputText) {
      if (char !== " ") {
        let x = p.random(p.width);
        let y = p.random(p.height);
        boids.push(new Boid(char, x, y));
      }
    }
  }
};

new p5(sketch);
