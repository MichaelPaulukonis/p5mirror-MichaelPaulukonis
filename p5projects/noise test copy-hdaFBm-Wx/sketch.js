let img
let originalImg
let noiseSlider
let noiseMax = 50
let chanceSlider
let chance = 0.0


function setup () {
  createCanvas(100, 100)
  noLoop()
  
  noiseSlider = createSlider(0, 50, noiseMax)
  noiseSlider.position(10, 30)
  noiseSlider.style('width', '200px')
  noiseSlider.input(() => {
    noiseMax = noiseSlider.value()
    buildImage(originalImg)
  })
  
  chanceSlider = createSlider(0, 1, chance, 0.1)
  chanceSlider.position(10, 60)
  chanceSlider.style('width', '200px')
  chanceSlider.input(() => {
    chance = chanceSlider.value()
    buildImage(originalImg)
  })

  buildImage(originalImg)
}

function buildImage (img) {
  console.log(noiseMax, chance)

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      // Add noise
      let noiseFactor = random() < chance ? Math.floor(random(-noiseMax, noiseMax)) : 0
      console.log(noiseFactor)
    }
  }

}
