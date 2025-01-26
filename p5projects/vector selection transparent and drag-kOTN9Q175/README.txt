// Load the image onto the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'your-image.png';
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Scan the image to find the bounding box
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let left = canvas.width, right = 0, top = canvas.height, bottom = 0;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      if (imageData.data[index + 3] > 0) { // Alpha channel is greater than 0 (not fully transparent)
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  }

  // Create a new canvas with the cropped dimensions
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = right - left + 1;
  croppedCanvas.height = bottom - top + 1;
  const croppedCtx = croppedCanvas.getContext('2d');
  croppedCtx.drawImage(canvas, left, top, croppedCanvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);

  // The cropped image is now available in the croppedCanvas
  console.log(croppedCanvas.toDataURL());
};
