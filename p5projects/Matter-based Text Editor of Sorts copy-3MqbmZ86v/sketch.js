// from https://editor.p5js.org/remarkability/sketches/UJlVD5Vc_

// See: https://creative-coding.decontextualize.com/intro-to-ritajs/
var defaultText
var lines = [""]
var theLine = ""
var font
var theText = ""
var lexicon;
var markov
var words = []


// Matter stuff
var Engine = Matter.Engine,
// Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;
var engine;
var world;
var boxes = [];
var ground;

function preload(){
  //defaultLines = loadStrings("oneLiners.txt")
  font  = loadFont("FreeSans.ttf")
  lexicon = new RiLexicon();
  
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  
  

  
 
}

var inpt
function setup() {
  createCanvas(600, 300);
  var options = {isStatic: true}
  ground = Bodies.rectangle(width/2, height-20, width, 20, options);
  World.add(world, ground);
  textSize(18)
  textFont(font)
  

  
  //CREATE INTERFACE
  inpt = createElement("textarea",defaultText);
  inpt.elt.rows = 15;
  inpt.style("font-size", "18px")
  
  inpt.elt.cols = 72;
    
  createElement("br");  
  var btn = createButton("Do This");
  
  btn.mousePressed(() => {
     theText = inpt.value()
    
  });
  
}

function keyTyped() {
  if (key === '.' | key == " " ) {
    
     theText = inpt.value()
     words = theText.split(" ")
    
      var params = {
    ignoreStopWords: true,
    ignoreCase: true,
    ignorePunctuation: true
  };
  counts = RiTa.concordance(defaultText, params); 
    print (counts[counts.length-1])
   var word = words[words.length-1] //get the last one typed... 
     var tags = RiTa.getPosTags(word);
    print (tags)
     if (tags.indexOf("nnp")>-1 |
          tags.indexOf("vb")>-1 |
         tags.indexOf("vbd")>-1 |
            tags.indexOf("vbn")>-1 |
         tags.indexOf("nns") >-1|
         tags.indexOf("nn") >-1
        ){
   
  //for (w in words){
    //var word = words[w]
    var similar = lexicon.similarBySound(word);
    //print (similar)
    for (s=0; s< similar.length; s++){
      var sWord = similar[s]
      var w = textWidth(sWord)
     
       boxes.push( new Box(sWord, width/2 + 20, 0, w ,40))
    }
    
    var rhymes = lexicon.rhymes(word);
    print(rhymes)
    for (var r=0; r< rhymes.length; r++){
      var rWord = rhymes[r]
      var w = textWidth(rWord)
       boxes.push( new Box(rWord, width/2 + 100, 0, w ,40))
    }
  }
  }
  //}
}

function draw() {
  background(50);
  
  
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  
  fill("gray")
  rect(ground.position.x, ground.position.y, width, 100);
  
  fill("yellow")
  text(theText, 20, 40, width/2, height-30);
}










  /*
  var ord = createElement("select");
  
  for(var i=2; i<21;i++){
  	var opt = createElement("option",i);
    if(i==3)opt.elt.selected = true;
    ord.child(opt);

  }
  createElement("br");*/