// https://stackoverflow.com/a/28416298/41153

var ctx = canvas.getContext('2d'),
    img = new Image();

img.onload = draw;
img.src = "https://i.sstatic.net/UFBxY.png";

function draw() {

  var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
      s = 2,  // thickness scale
      i = 0,  // iterator
      x = 5,  // final position
      y = 5;
  
  // draw images at offsets from the array scaled by s
  for(; i < dArr.length; i += 2)
    ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);
  
  // fill with color
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = "red";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  console.log(canvas.width, canvas.height, img.width, img.height)
  
  // draw original image in normal mode
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, x, y);
}