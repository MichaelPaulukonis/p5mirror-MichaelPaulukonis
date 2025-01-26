/* global p5 */

// https://editor.p5js.org/MichaelPaulukonis/sketches/sGnW8FUdE

// https://www.1001fonts.com/asterisp-font.html

const sketch = p => {
  let font
  const displayWidth = 600
  // const alpha = 'abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUVWXY'
  const alpha = 'abcdeGHIJKLMNOPQRSTUVWXYZ'

  p.preload = () => {
    font = p.loadFont('assets/Asterisp Alpha.otf')
  }

  p.setup = () => {
    p.createCanvas(displayWidth, displayWidth)
    p.noLoop()
  }

  p.draw = () => {
    p.background(255)
    const dx = p.width / 2
    const dy = p.height / 2
    p.textAlign(p.CENTER, p.CENTER)
    p.textFont(font)
    p.text(alpha, dx, dy)
    p.textFont('Helevtica')
    p.textSize(20)
    p.text(alpha, dx, dy + 30)
  }
}

new p5(sketch) // eslint-disable-line no-new, new-cap
