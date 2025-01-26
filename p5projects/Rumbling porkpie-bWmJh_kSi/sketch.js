// based on Roni Kauffman's work @ https://github.com/ronikaufman/poetical_computer_vision/blob/main/days21-31/day24/day24.pde
// copilot translation from P3 to p5js


const s = (p) => {
  let img;
  let clusters;
  const MAX_ITER = 512;
  
  let timings = {};

  const startTimer = (label) => {
    timings[label] = { start: performance.now() };
  };

  const stopTimer = (label) => {
    timings[label].end = performance.now();
    timings[label].duration = timings[label].end - timings[label].start;
  };

  const logTimings = () => {
    for (const [label, timing] of Object.entries(timings)) {
      console.log(`${label}: ${timing.duration.toFixed(2)} ms`);
    }
  };

  p.preload = () => {
    startTimer('loadImage');
    img = p.loadImage("images/ada.jpg");
    stopTimer('loadImage');
  };

  p.setup = () => {
    p.createCanvas(512, 512);
    startTimer('initialSetup');
    img.filter(p.BLUR, 1);
    img.resize(img.width / 2, img.height / 2);
    p.noLoop();
    p.noStroke();
    stopTimer('initialSetup');

    startTimer('imageToData');
    let data = imageToData();
    stopTimer('imageToData');

    let k = 3;

    // initialization
    startTimer('initialize');
    let centroids = initialize(data, k);
    stopTimer('initialize');

    let newCentroids;
    let stopMeNow;
    let iter = 0;
    startTimer('clustering');
    do {
      // assignment
      clusters = assign(data, centroids);

      // update
      newCentroids = update(data, clusters, k);

      // check if we need to stop
      stopMeNow = (iter++ > MAX_ITER) || centroids.every((c, i) => c.equals(newCentroids[i]));

    } while (!stopMeNow);
    stopTimer('clustering');

    const palette = [
      ["#0a1966", "#ffef0d", "#fafafa"],
      ["#ee726b", "#ffc5c7", "#fef9c6"],
      ["#0b1435", "#218ad4", "#76df55"],
      ["#102340", "#fe01ec", "#8a07da"]
    ];

    startTimer('clustersToImage');
    for (let i = 0; i < 4; i++) {
      let x0 = (i % 2) * p.width / 2;
      let y0 = Math.floor(i / 2) * p.height / 2;
      let colors = palette[i];
      clustersToImage(clusters, x0, y0, colors);
    }
    stopTimer('clustersToImage');

    logTimings(); // Log timings once everything is complete
  };

  const imageToData = () => {
    let data = [];
    for (let x = 0; x < img.width; x++) {
      data[x] = [];
      for (let y = 0; y < img.height; y++) {
        let col = img.get(x, y);
        let v = p.createVector(p.red(col), p.green(col), p.blue(col));
        data[x][y] = v;
      }
    }
    return data;
  };

  const initialize = (data, k) => {
    let centroids = [];
    for (let i = 0; i < k; i++) {
      let x = Math.floor(p.random(img.width));
      let y = Math.floor(p.random(img.height));
      centroids.push(data[x][y]);
    }
    return centroids;
  };

  const assign = (data, centroids) => {
    let clusters = [];
    for (let x = 0; x < img.width; x++) {
      clusters[x] = [];
      for (let y = 0; y < img.height; y++) {
        let col = data[x][y];

        // find closest centroids
        let argmin = 0;
        let minDist = col.dist(centroids[0]);
        for (let i = 1; i < centroids.length; i++) {
          let d = col.dist(centroids[i]);
          if (d < minDist) {
            argmin = i;
            minDist = d;
          }
        }

        // assign
        clusters[x][y] = argmin;
      }
    }
    return clusters;
  };

  const update = (data, clusters, k) => {
    let sumsR = new Array(k).fill(0);
    let sumsG = new Array(k).fill(0);
    let sumsB = new Array(k).fill(0);
    let counts = new Array(k).fill(0);

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let c = clusters[x][y];
        let col = data[x][y];
        sumsR[c] += col.x;
        sumsG[c] += col.y;
        sumsB[c] += col.z;
        counts[c]++;
      }
    }

    let newCentroids = [];
    for (let i = 0; i < k; i++) {
      let n = counts[i];
      let v = p.createVector(sumsR[i] / n, sumsG[i] / n, sumsB[i] / n);
      newCentroids.push(v);
    }
    return newCentroids;
  };

  const clustersToImage = (clusters, x0, y0, colors) => {
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let c = clusters[x][y];
        let col = colors[c];
        p.fill(p.color(col));
        p.square(x + x0, y + y0, 1);
      }
    }
  };
};

new p5(s);
