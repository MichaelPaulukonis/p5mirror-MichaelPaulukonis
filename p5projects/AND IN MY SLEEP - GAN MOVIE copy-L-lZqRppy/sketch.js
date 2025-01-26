var font
var vid 
var sentences = ["", "And in my sleep", "every night", "behind my eyelids", "they showed me",
                 "every single place" , "I had never been to", "ever"]
var sentenceCounter = 0
var theSentence 
var alph = 255
var finished = false;
var alph2 = 50

function nextSentence(){
   alph = 255
  sentenceCounter++
   
  
  if (sentenceCounter == sentences.length ){
   sentenceCounter = 0
    theSentence = ""
   // vid.pause()
    print("THE END!")
    finished = true
    
  }else{
     theSentence = sentences[sentenceCounter]
  }
  
   
  print(theSentence)
}

function preload(){
  font = loadFont("Franklin Gothic Heavy Italic.ttf")
  vid  = createVideo('StyleGAN - August 29th 2019 at 3.10.58 PM.MP4');
}

function setup() {
  createCanvas(512, 512);
  vid.loop()
  vid.hide()
  textFont(font)
  textAlign(CENTER, CENTER)
  textSize(100)
  fill("white")
  theSentence = sentences[sentenceCounter]
  setInterval(nextSentence, 3000)
}

function draw() {
  if (!finished){
    fill(255, alph)
    image(vid, 0, 0, width, height);
    text(theSentence, 10,0, width, height)
    alph -= 3
  }else{
    tint( 255, alph2)
    fill(255, alph2)
    noStroke()
   
    
    image(vid, 0, 0, width, height);
     rect(0,0,width, height)
    alph2++
  }
  
}