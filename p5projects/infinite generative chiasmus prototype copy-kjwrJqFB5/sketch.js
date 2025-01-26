let displayTop = [];
let displayBottom = [];
let easer = new p5.Ease();
let easeVal = 0;
let isEasing = false;

let tsize = 24;
let theight = 36;

function setup() {
  createCanvas(720, 720);
  console.log(easer);
  textFont("Georgia");
  textSize(tsize);
}

function draw() {
  background(255, 255, 254);

  let ease = easer.quadraticInOut(easeVal);
  
  push();
  textAlign(LEFT, CENTER);
  translate(0, width / 2);
  for (let i = 0; i < displayTop.length; i++) {
    if (i == 0) {
      fill(40, 255 * ease);
    }
    else {
      fill(40, 255 - (i*24));
    }
    textSize(tsize + (i*(theight*0.1)));
    text(displayTop[displayTop.length - 1 - i],
      10, (i + ease*0.5) * -theight);
  }
  pop();

  push();
  textAlign(LEFT, CENTER);
  translate(0, width / 2);
  for (let i = 0; i < displayBottom.length; i++) {
    if (i == 0) {
      fill(40, 255 * ease);
    }
    else {
      fill(40, 255 - (i*24));
    }
    textSize(tsize + (i*(theight*0.1)));
    text(displayBottom[displayBottom.length - 1 - i],
      10, (i + ease*0.5) * theight);
  }
  pop();

  if (isEasing) {
    easeVal += 0.05;
  }
  if (easeVal >= 1.0) {
    isEasing = false;
  }
}

function mousePressed() {
  let idx = int(random(sentences.length));
  console.log(sentences);
  console.log(idx);
  displayTop.push(sentences[idx][0]);
  displayBottom.push(sentences[idx][1]);
  sentences.splice(idx, 1);
  console.log("top", displayTop, "bottom", displayBottom);
  isEasing = true;
  easeVal = 0;
}

let sentences = [["To lift her, and in beauty, fair.", "Fair, in beauty, and a little head"], ["Immortal and pure, doth!", "Ah! Tender, as pure!"], ["The simple of such as they seem;", "Therefore, though it was a hundred years"], ["For ever I forget", "Forget it for ever"], ["He led him to the king of minstrel,", "Minstrel, and the king of his bower"], ["Come as that one of death", "Death was a day that saw"], ["Whirling from a boughs of the blue.", "Blue, the sun-sad from the river's eye"], ["O'er me a serenade,", "Sojourn, if a sun"], ["Quod si quidum lesto gracullo,", "Omnia lest, necto quidque deem"], ["That he shall not be mingled in the fight", "Safe in the faintness of his will"], ["Of drooping-notod of a sigh", "Sighs a harp of silver-lorn"], ["A hundred-songs, and day,", "After, as a ham-maid,"], ["I have I have seen forever;", "Safe as I, that I have"], ["Swift as a storm of iron-wark'd crest,", "Broad, a snail of the sun-locks of"], ["For war and privion of the oak,", "Inhabitants, in a court of battle of men"], ["Has ready, and to hear the fight.", "Coming, and then the words of us,"], ["Where are far than better than", "Than evermore as far away"], ["There, in our steps must reach the dusty", "Mid-morrow's place of all,"], ["Bids those happy summer-song,", "Summer-eyed, ye never show"], ["The old old church is there,", "There, in a year of old"], ["In ev'ry foe, and never felt,", "Courage, so long, and lulls my heart"], ["Five-fame a bonny,", "Bonnet, a hundred-fowl"], ["Sae up a-wee a-I \u2047", "Yes, a-and-wuddle me"], ["Whereof a breeze that sets her bowers to be,", "Oh, to her homeward, as a man draw"], ["At a gallant haughty's feet that he", "He saw her haughty gallant to her side"], ["And laid her down a silver-w", "Silver-waved in her hair"], ["Cries for my country, as I take my heart", "Heart to take you all, and thence I go"], ["That I am tired and the night,", "All, and the dark love I have"], ["And clear in silence, and a little eyes;", "Dark, and a voice of the dark and clear"], ["The morning's feet of the hills!", "Watching through the vale, and then the sun"], ["In those women join to the woods, and go", "Come, and the woods of all the first"], ["How she is not--a dream of mine", "Mine is a dream? If she is"], ["Ah, well and weeping, that they were", "All were weeping, and sweet and sweet,"], ["After thee, we've aweary,", "A man, I am for her, and thee"], ["For one day is a little time of mine!", "Mine, as a day is this one day"], ["Of such a heart of gold.", "Gold, and a thought of this"], ["Come up to hear the wildness blow", "Hastened of thee to meet"], ["And poor and jove,", "Yes, who was that for"], ["That, as I have not made me.", "Oh, it was not for my own,"], ["That when he says to gain me weary.", "Weary, my heart is not to see"], ["And thou hastened a little sleep,", "Sleep, he saw me soar"], ["How I can stay a man's gone to be", "Must be a time for me or I can see"], ["Sing me, and we have gone,", "Once, I have not, and hear"], ["Or you am a pity of love,", "For my heart, as I know of me"], ["And high as hospitable,", "Torrent, and high and"], ["Such will not thy own.", "That, if you will not"], ["Not as a thing of ae or need,", "Well, if a man is as a thing"], ["But she sings a little boy to my dream", "Dream's little little a little boy"], ["The sacred zone of morning.", "Beloved, of the morning tree"], ["I can pierce a world to be a power", "Within thee is a god to be"], ["And make a thing!", "Oh, a little days"], ["And the widow's palace gave", "Gave a city of the world"], ["Wherewith such the mariner war of ether.", "Hunting of life, a thousand-born and"], ["Nor lilies of greece and roman years.", "Seven years, and other other men and sit"], ["There, look on us, to each way", "Behind thee, if it is gone,"], ["Home, and both, in vain of mortal.", "Change, and of our heart, and weep,"], ["The slim of haughty and hiawatha,", "Hither, to-morrow and her son of his"], ["Oft\u00e1, and vulture,", "V\u00e1n, in the folly,"], ["Wist and a song of a ringing fire,", "Sun, a mist of a dream of my heart"], ["Long as a war-gods again,", "Again, o'er the blesting"], ["Has none of her face", "Seeing a little other day"], ["A sweetest-birds of a spring", "Spring in a dream of merry-song"], ["If virtue of their protection.", "Individual, and by this virtue"], ["Of his arms, and a woman, and no more,", "One, as I was in his own, and a"], ["The way to dost thou mean to be.", "Be now, who will not take thee to"], ["He came to see and cry,", "Oh, when he comes to see"], ["It is, and down the fairy hours.", "Summer, and the sunshine of her,"], ["I know I see, I've never can", "Can I have I know, I know not"], ["For from a tree:", "Green, a little hour"], ["Far as mortals, yet I hear,", "Hear, if I knowest, as we"], ["And bless them all to live, and the year.", "Year, and in my heart, and let us be"], ["Outside, a little letter, there was a year", "For one was a monk, a little day,"], ["His face was a great-shov'd trod,", "Leaped, in a pillow, his heart was a hand"], ["Two torrents and weeps", "Weary in a thousand foes"], ["A stealthy foe of his sacred rage,", "Diana, with his foe, the slaughtered"], ["And his horse went, and the little boat,", "Beside him, and then, and took my hat"], ["'the old-faced-house of the town of day.", "Day, in the old-year of the old-wuz"], ["The comeliest was that weeps in my eyes,", "Look, and in this lovely's yonder swoon"], ["There is, or spring, a bird, from thee,", "Thee, a star, or, in a dream of"], ["His husbands for that I look", "Follow for that I have been"], ["And show an enshaken,", "Envy, I'll take"], ["And not a slumber's narrow door;", "Quickly, bent her back, and on her face"], ["It was not here a moment, ere the light", "High in a moment, no more than the hour"], ["Or a country-tree and a rope", "Throws to the wood-tree of a"], ["Who seek me here in safety, no more,", "More, if I have, the best can bear"], ["Passing of truth, and the light,", "Within, and of the world is one"], ["A sighing that is not above!", "Above, and there is no more of me"], ["For ever a clear;", "Making a dream of time"], ["His sighs on the mountain-nine", "Sky-like o'er her sigh"], ["Went back to-day and butterflies", "Butterflies and a-man's--"], ["And other lulls of a husband's pain.", "Companion, and in my dream of man's eyes"], ["And thointed fancies uplif,", "Uplifted, and old woman's"], ["Upon these welleliness awhile", "A mighty thought I cannot be seen"], ["By a stately-springs of a cavalier.", "Late, by a world of stately-tinted on"], ["To thy power.", "Save, to me"], ["But hear a tale of wonder-bye, and know,", "Oh, for a word of song, to thee"], ["A dreadful shadow of light,", "High, in a lofty flame"], ["For here and trodden of the world!", "For the world, who want of the sea"], ["Of darkness clear a glowing,", "Glowing, a clear light of"], ["When having breathed a day, a mighty thing", "Poor thing a man, awhile could be"]];