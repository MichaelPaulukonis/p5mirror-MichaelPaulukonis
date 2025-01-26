let t = 'how are you doing there if you woud be so kind as to tell me'
// let t = 'how are you doing?'
let width = 50
let length = t.length

const windowMaker = (text) => (width) => (startIndex) => {
  const w = []
  for (let i = 0; i < width; i++) {
    const index = (startIndex + i) % text.length
    w[i] = text[index]
  }
  return w.join('')
}


function setup() {
  noLoop()
}

function draw() {
  const wndw = windowMaker(t)(width)
  for (let i = 1000; i < 1010; i++) {
    console.log(wndw(i))
  }
}