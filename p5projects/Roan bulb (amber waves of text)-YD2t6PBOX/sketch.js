    let cols, rows;
    let scl = 20;
    let w, h;
    // let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let letters = 'Now is the winter of our discontent, Made glorious summer by this sun of York'
    let zoff = 0;

    function setup() {
      createCanvas(800, 800);
      w = width;
      h = height;
      cols = floor(w / scl);
      rows = floor(h / scl);
      textSize(16);
      textAlign(CENTER, CENTER);
      frameRate(10)
    }

    function draw() {
      background(255);

      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          let index = int(noise(xoff, yoff, zoff) * letters.length);
          let letter = letters.charAt(index);

          let xPos = x * scl + scl / 2;
          let yPos = y * scl + scl / 2;

          fill(0);
          text(letter, xPos, yPos);

          xoff += 0.1;
        }
        yoff += 0.1;
      }
      zoff += 0.01;
    }