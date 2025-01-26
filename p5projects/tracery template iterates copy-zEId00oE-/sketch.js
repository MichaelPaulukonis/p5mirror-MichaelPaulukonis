

let outputP;
let genButton;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  genButton = createButton("Click to generate");
  genButton.mousePressed(generate);
  outputP = createP("");
} 

function draw() { 
}

function generate() {
  
  let names = ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"];
  let origin = ["#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!", "Hey, #name#!"]
  
  for (let i = 0; i < names.length; i++) {
  
    var grammarSource = {
      "interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
        "good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
      "profession": [
            "accountant",
            "actor",
            "archeologist",
            "astronomer",
      ],
      "name": names[i]
    };
    
    if (i % 4) {
      grammarSource.origin = origin[0];
    }
    else {
      grammarSource.origin = origin[1];
    }

    var grammar = tracery.createGrammar(grammarSource);
    grammar.addModifiers(tracery.baseEngModifiers);
    var output = grammar.flatten("#origin#");
    outputP.html(output + "<br>", true);
  }

}

