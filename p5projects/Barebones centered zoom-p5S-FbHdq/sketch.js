const sketch = p => {
  let img
  let zoomFactor = 1.0

  p.preload = () => {
    img = p.loadImage('images/mona.crosshairs.png')
  }

  p.setup = () => {
    p.createCanvas(600, 600)
    p.fill(0)
    p.stroke('white')
    p.strokeWeight(2)
    p.textSize(16)
    p.textAlign(p.CENTER, p.CENTER)
  }

  p.draw = () => {
    p.background(255)
    const cellSize = 200
    const dx = (p.width - cellSize) / 2
    const dy = (p.height - cellSize) / 2

    if (zoomFactor > 1.0) {
      const displayWidth = cellSize / zoomFactor
      const displayHeight = cellSize / zoomFactor
      const offsetX = (cellSize - displayWidth) / 2
      const offsetY = (cellSize - displayHeight) / 2
      p.image(img, dx + offsetX, dy + offsetY, displayWidth, displayHeight)
    } else {
      const zoomedWidth = img.width * zoomFactor
      const zoomedHeight = img.height * zoomFactor
      const sx = (img.width - zoomedWidth) / 2
      const sy = (img.height - zoomedHeight) / 2
      p.image(img, dx, dy, cellSize, cellSize, sx, sy, zoomedWidth, zoomedHeight)
    }

    p.text(`${zoomFactor}`, p.width / 2, p.height - 20)
  }

  p.keyPressed = () => {
    if (p.key === '>') {
      zoomFactor *= 1.1
    } else if (p.key === '<') {
      zoomFactor /= 1.1
    }
  }
}

new p5(sketch)