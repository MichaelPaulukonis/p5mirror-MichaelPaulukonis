function dither(image) {
  this.image = image;
  this.width = this.image.width;
  this.steps = parseInt(this.image.height / this.width, 10);
  this.image.loadPixels();
  //console.log(this.file + ", " + this.image + ", " + this.width + ", " + this.steps);
}

function ditherColor(chroma, x1, y1) {
  var mX = x1 % dithers[currentDither].width;
  var mY = y1 % dithers[currentDither].width;
  var level = ceil(map(chroma, 0, 100, dithers[currentDither].steps, 0));

  var newColor = dithers[currentDither].image.get(
    mX,
    mY + (level - 1) * dithers[currentDither].width
  );

  return newColor.toString("#rrggbb") === "255,255,255,255";
}
