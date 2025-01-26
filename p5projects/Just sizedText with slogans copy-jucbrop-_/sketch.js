var font;
var img;
var sloganInc = 0

var royalBlue = '#0063FF' 
var myRed = "#F5005A"
var myWhite  = "#FC00F1"
var myBlue = "#1D6EF5"
var theText

function preload() {
  //font = loadFont("Roboto-BoldCondensed-webfont.ttf") 
  font = loadFont("Franklin Gothic Heavy Italic.ttf") 
  //img = loadImage("boris_zipwire.png")

}


function changeTheText(){
  sloganInc ++
 
  if (sloganInc == sloganList.length){
    sloganInc = 0
  }
   theText = sloganList[sloganInc]
     saveCanvas(theText.substring(0,10) +"_"+ int(random(0,1000))+".jpg")

}



function doText(theText, rectWidth, rectHeight ){
  
  startingFontSize = 10 //purely arbitrary, can tweak to match destination to speed up.

  fontSize = calculateFontSize(theText, rectWidth, rectHeight, font, startingFontSize)
  
  print("the fontSize for that text is: " ,fontSize, textLeading())
  textLeading(10);
  textSize(fontSize)

}

function setup() {
  createCanvas(1200, 800);
  strokeWeight(0)

  textFont(font)
  textSize(30)
  noStroke()
  textAlign(CENTER, BASELINE)
  changeTheText()
  setInterval(changeTheText, 2000)
}


function draw() {
 background(myBlue)
  rectX = 40
  rectY = 50
  rectWidth = width-100
  rectHeight = height-100
  doText(theText,rectWidth ,rectHeight )
  textLeading(fontSize*0.96);
    
  fill(myRed)
  //rect( rectX, rectY, rectWidth, rectHeight) 
  //{class:8-bit RGB color, red:255, green:255, blue:62}
  fill(255,255, 62,200)
  
  text(theText, rectX, rectY, rectWidth, rectHeight)
}


  
function mousePressed(){

  saveCanvas(theText.substring(0,10) +"_"+ int(random(0,1000)+".jpg"))
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

var sloganList = [ "", "FEEL WELCOME",
 "IMAGINATION!",
 "NO TAXATION!",
 "BETTER WAR THAN JOBS SLAVE",
 "OPEN HAPPINESS",
 "DO ME A BREAK",
 "ABOLISH THE LAST AMERICA!",
 "IF IT IS IT IS!",
 "IMPROVEMENT!",
 "YOU CAN'T TURN BACK THE MEAT",
 "THERE'S ALWAYS A BETTER WAY TO ADVERTISE!",
 "YOUR AMBITION SMILES BACK AT THE BUNNY INSIDE?",
 "THERE'S A WAR ON WOMEN",
 "MOTION IS NOT WAR",
 "EMPOWERING FORWARD, BUT NOT IN YOUR LIFETIME",
 "MAYBE SHE'S BORN WITH A WAY TO ADDRESS THE PATRIARCHY",
 "OPPORTUNITY FOR ONE",
 "WHY AREN'T YOU FREE LUNCHING?",
 "CHANGE THAT WORKS FOR US",
 "IT'S THERE!",
 "DON'T GET POORER",
 "FORCES OF OPPOSITIVELY, POSITIVELY BOW DOWN",
 "EVERYONE!",
 "MONEY IS CABBAGE.",
 "THERE IS WISDOM.",
 "NEW THINKING TOGETHER",
 "UP THE 1980S",
 "MAKE BELIEVE YOU ARE NOT ANNOYED BY KINDNESS",
 "HOPE FOR ALL!",
 "IT'S MY WAY",
 "STRONGER AND FUN",
 "THERE IS MONEY IN EVERY BUBBLE'S TEARS",
 "DEATH IS A KINDNESS",
 "COURAGE AND HESITATION",
 "GOOD THING",
 "BENEVOLENCE IS AN EVIL WAR",
 "FORGIVE YOUR INFERIOR CONSCIENCE",
 "LET'S KEEP GOING AS INTEGRATED BRAND PROMOTION WITHOUT CONTROL OF OUR TIME HAS COME",
 "BE ALL EQUALS",
 "IT'S MY WAY",
 "FORGIVE YOUR INFERIOR CONSCIENCE",
 "WE SIMPLY DELIVER THE EXPENSE OF TODAY! AND BRIGHTER",
 "SPEAK IN THE CRIME",
 "COURAGE CAN TRAVEL ON WICKEDNESS' ILLS",
 "INNOCENT",
 "PROMISES WILL HAVE THEIR TRIAL ",
 "HE PRESENTATION IS PASS HARDLY BETTER THAT MAKE THE MIND DOES NOT TO BEAR THAN TO SIT AT A SMILING SO MUCH PASSES IS AT HAS THE GREATEST PLEASE MAN FORESEE EVERY MAN SPEAKS, SO IS RUINED TO TRUSTS THE POWER",
 "THE LIFE OF DOGS",
 "IT IS FOOD",
 "THE UNHAPPY MAN, WHO HAS NECESSITY, KNOWS HOW",
 "IN THE MIDST OF PROSPERITY I DISLIKE THE COMMAND OF A WISE MAN IN PARDONS",
 "TIME HAS COME",
]
