let scalar = 0.8; //a made up number for each font
var asc //textAscention size
var spaceWidth //how big is a space?
var img
var fontSize = 30
var leading



function calculateFontSize(theText, w, h, font, tSize){
  var p = 0 //iterator to see how many times it took to "fill the space"

  //let scalar = 0.7; //a made up number for each font
  asc = textAscent() * scalar; // Calc ascent 
  var spaceWidth //the width of space char
  //var gutterSize = 4
  var words = theText.split(" ");
  print(words.length, "words")
 
var y = 0
  while( y < h){
    var x = 0
    var currentOffset = 0; //rightwards value
    y = 0
     var lineNum = 0;
      
      for (var j = 0; j < words.length; j++) {
        textSize(tSize);
        leading = textLeading() * 0.75
        
        spaceWidth = textWidth(" ")
        var wordWidth = textWidth(words[j]);
        asc = textAscent() * scalar; // Calc ascent 
        
        x = spaceWidth + currentOffset  //xpos
        var rightEdge = x + wordWidth
        
        if (rightEdge > w - spaceWidth){
          //print("rightEdge", rightEdge, x, j)
          currentOffset = 0
          x = wordWidth + currentOffset //xpos
          lineNum ++
          
        }
        y = lineNum * tSize + leading  //+ asc
         if (currentOffset == 0){
          spaceWidth = textWidth(" ")
        }else{
          spaceWidth = textWidth(" ")
        }       
       
        fill(0,200, 200, x)
        //print(x, y, wordWidth, tSize)
        rect(x, y , wordWidth, tSize)
        fill("red")
        text(words[j], x, y , wordWidth, tSize);///don't draw

        // four pixels between words
        currentOffset += wordWidth + spaceWidth; 
      
    }
        
    if (y - tSize  > h -tSize ){
       print ("this took",p, "times")
      //print( x, y, w, h - tSize, tSize )
       
       textSize(tSize);
       return tSize 
    }else{
      
      textSize(tSize);
    
    }
   tSize += 0.5 //change this to reduce/increase the number of iterations
    //and speed  to calculate
   p++  
  }
    
  return tSize 
  
}


