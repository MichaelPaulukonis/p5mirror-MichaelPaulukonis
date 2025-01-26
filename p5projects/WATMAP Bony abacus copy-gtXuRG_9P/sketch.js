// MODEs LIST

var AVG_MODE = 0; // worst matching, difference of avgs of the luma
var ABS_MODE = 1; // difference of the luma each pixel
var DIST_MODE = 2; // best matching, distance between pixels vars (vectors)

var mode = 2;  // list is AVG_MODE, ABS_MODE, DIST_MODE
var THR = 64; // higher value bigger rectangles (1..200)
var MINR = 8; // minimum block (4..200)
var number_of_iterations = 80; // more = more variety
var number_of_blocks = 200; // more = more search tries
var max_display_size = 800; // viewing window size (regardless image size)

var blends = ['ADD', 'SUBTRACT',' DARKEST']//, LIGHTEST, DIFFERENCE, EXCLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN};
var do_blend = true; // blend image after process
var blend_mode = 'DARKEST'; // blend type
var buffer;// working buffer
var img;// image
var gNumber = 0;
var sessionid;
var currImage;
var filenames = [
  'kirkstall forge axels_29.jpg',
  'kirkstall forge black and white_37.jpg'
]

var usefilenames = [
  'friesian cow black and white jpg_142.jpg ',
  'kirkstall forge axels_16.jpg']

var imgsb =[];  //List of LIImages
var parts = {}; //Dict of part obj

var canvas
function preload(){
  gNumber = filenames.length;
  img = loadImage( filenames[0] );

}

function setup() {
  sessionid = hex((int(random(0xffff,4))))
  print("Starting...")
  buffer = createGraphics(img.width, img.height); //Do we resize this as we go?
  buffer.noStroke();
  buffer.background(255);
  canvas = createCanvas(img.width,img.height)
  print("Started.")
}

function draw() {
 print("Drawing...")
 for (var i=0; i< (filenames.length-1); i++) {
   if (i==0){
     //use loaded image
   }else{
     currImage = filenames[i];
     img = loadImage(filenames[i]);
   }
    // calculate window size
      var ratio = img.width/img.height;
      var neww, newh;
      if(ratio < 1.0) {
        neww = int(max_display_size * ratio);
        newh = max_display_size;
      } else {
        neww = max_display_size;
        newh = int(max_display_size / ratio);
      }

      resizeCanvas(neww, newh);

    processImage();
    gNumber++;

   }
   if (gNumber == filenames.length-1){
     print("DONE!")
   }
   print("Finished");
}



function LImage(b, name, w, h) {
  var b;
  var name;
  var w, h;
}

function Part() {
  var posx
  var posy
  var w
  var h;
  var x
  var y;

}


function processImage() {
  imgsb = [];
  parts = {};
  buffer = createGraphics(img.width, img.height);
  print("Preparing data...");

  prepare_image();
  prepare_patterns();
  segment(0, img.width-1, 0, img.height-1, 2);

  print("Layering");
  for ( var key in Object.keys(parts)) {
    try{
      var  pList = parts[key];
      print("key:", key);
      var _img = loadImage(key);
     // currImage = key;
      print("Parts from image: " + key);
      for (p in  pList) {
        var part = pList[p]
        //buffer.tint(0, 153, 204, 126);
        buffer.image(_img.get(part.posx, part.posy, part.w, part.h), part.x, part.y);
      }
    }catch( e){
      print( e);
    }
  }

      //print("done", imgsb.createCanvas(), parts.createCanvas() );
      // END CODE HERE!

      if(do_blend)
        buffer.blend(img,0,0,img.width,img.height,0,0,buffer.width,buffer.height,blend_mode);

  //buffer.endDraw();
  //buffer.tint(0, 153, 204, 126);  // Tvar blue and set transparency
  image(buffer,0,0,width,height);

   //var name = img.
  save(buffer, sessionid+"/" + hex(int(random(0xffff),4)) + ".jpg");
}


var imgb =[];//list of lists
function prepare_image() {
  print("Prepping image..."   ); //create the empty lists!
  imgb = new Array(img.width)

  for (var x=0; x<img.width; x++) {
    imgb[x] = []
    for (var y=0; y<img.height; y++) {
      imgb[x][y] = []
    }
  }

  print("prepping 2")
  for (var x=0; x<img.width; x++) {
    for (var y=0; y<img.height; y++) {

      var c = img.get(x, y);
      var r = map((c>>16)&0xff, 0, 255, 0, 1);
      var g = map((c>>8)&0xff, 0, 255, 0, 1);
      var b = map(c&0xff, 0, 255, 0, 1);
      var v = createVector(r, g, b);
      imgb[x][y] = v;
      //print(x, y, v);
    }
  }
}

function prepare_patterns() {
  print("patterns");
  for (var i=0; i < usefilenames.length -1 ; i++) {

    try{
        print( usefilenames[i]);
        if (currImage == usefilenames[i] ){
        }else{
        var _img = loadImage( usefilenames[i] );
        var bi = new LImage();

        var x = new Array(_img.width); //CREATE LIST OF LISTS
        for (var i = 0; i < x.length; i++) {
          x[i] = new Array(_img.height);
        }

        bi.b = x


        bi.name = usefilenames[i];
        bi.w = _img.width;
        bi.h = _img.height;
        for (var x=0; x<_img.width; x++) {
          for (var y=0; y<_img.height; y++) {
            var c = _img.get(x, y);

            print((c>>16)&0xff)
            var r = map((c>>16)&0xff, 0, 255, 0, 1);
            var g = map((c>>8)&0xff, 0, 255, 0, 1);
            var b = map(c&0xff, 0, 255, 0, 1);
            var v = createVector(r, g, b);
            bi.b[x][y] = v;
            print( "pattern:", x, y, v);
          }

        }

        imgsb.push(bi);
        }
    }catch(  e ){
         print(e);
    }

  }//end for

}

function find_match( posx , posy , w , h) {
  var br = 0;
  if (mode == AVG_MODE) {
    for (var x=posx; x< (posx+w); x++) {
      for (var y=posy; y< (posy+h); y++) {
        br+= getLuma(imgb[x][y]);
      }
    }
  }

  var currdiff = 1.0e10;
  var currxx = -1;
  var curryy = -1;
  var currimg = null;//LImage

  for (var i=0; i<number_of_iterations; i++) {
    var eee = int(random(imgsb.length-1));

    print (imgsb)
    var _img = imgsb[ eee ];
    for (var iter=0; iter<number_of_blocks; iter++) {

      var xx = int(random(_img.w-w-1));
      var yy = int(random(_img.h-h-1));

      if(xx+w >= _img.w || yy+h >= _img.h) break;

      var lbr = 0;
      for (var x=xx, xi=posx; x< (xx+w); x++, xi++) {
        for (var y=yy, yi=posy; y< (yy+h); y++, yi++) {
          if(mode == DIST_MODE)
            lbr += _img.b[x][y].dist(imgb[xi][yi]);
          else if(mode == AVG_MODE)
            lbr += getLuma(_img.b[x][y]);
          else if(mode == ABS_MODE)
            lbr += abs(getLuma(_img.b[x][y])-getLuma(imgb[xi][yi]));
          }
        }


      var ldiff = mode == AVG_MODE?abs(br-lbr):lbr;
      if (ldiff<currdiff) {
        currdiff = ldiff;
        currxx = xx;
        curryy = yy;
        currimg = _img;
      }
    }


  }

  var p = new Part();
  p.posx = currxx;
  p.posy = curryy;
  p.w = w;
  p.h = h;
  p.x = posx;
  p.y = posy;

  var list =[];
  try{
      if (parts.hasOwnProperty(currimg.name)) {
        list = parts[currimg.name];
      } else {
        list = [];
        parts[currimg.name] =list;
      }
      list.push(p);
  }catch ( e){
    print( e);
  }

  //print("Matched: " + currimg.name + "; " + p);
}

function segment( x1 , x2 , y1 , y2 , obl) {
  print("Segmenting");
  var diffx = x2-x1;
  var diffy = y2-y1;
  if ((obl>0) || (diffx>MINR && diffy>MINR && godeeper(x1, x2, y1, y2))) {
    var midx = int(random(diffx/2-diffx/4, diffx/2+diffx/4));
    var midy = int(random(diffy/2-diffy/4, diffy/2+diffy/4));
    segment(x1, x1+midx, y1, y1+midy, obl-1);
    segment(x1+midx+1, x2, y1, y1+midy, obl-1);
    segment(x1, x1+midx, y1+midy+1, y2, obl-1);
    segment(x1+midx+1, x2, y1+midy+1, y2, obl-1);
  } else {
    find_match(x1, y1, diffx+1, diffy+1);
  }
}

function getLuma( v ) {
  return v.x*0.3+0.59*v.y+0.11*v.z;
}

function getLumaN( v) {
  return (int)(255*getLuma(v));
}

function godeeper( x1 , x2 , y1 , y2) {
  var h =new Array(255)
  // top and bottom line
  for (var x=x1; x<=x2; x++) {
    h[getLumaN(imgb[x][y1])]++;
    h[getLumaN(imgb[x][y2])]++;
  }
  // left and right, without corners
  for (var y=y1+1; y<y2; y++) {
    h[getLumaN(imgb[x1][y])]++;
    h[getLumaN(imgb[x2][y])]++;
  }
  var midx = x1+(x2-x1)/2;
  var midy = y1+(y2-y1)/2;
  // horizontal, without endpoints
  for (var x=x1+1; x<x2; x++) h[getLumaN(imgb[x][midy])]++;
  // vertical, without endpoints
  for (var y=y1+1; y<y2; y++) h[getLumaN(imgb[midx][y])]++;
  // remove crossingpoint
  h[getLumaN(imgb[midx][midy])]--;

  // calculate mean
  var mean = 0;
  var sum = 0;
  for (var i=0; i<256; i++) {
    mean += i * h[i];
    sum += h[i];
  }
  mean /= sum;

  var stddev = 0;
  for (var i=0; i<256; i++) {
    stddev += sq(i-mean)*h[i];
  }
  stddev = sqrt(stddev/sum);

  return stddev > THR;
}

//


// ALL Channels, Nxxx stand for negative (255-value)
// channels to work with
var RED = 0;
var GREEN = 1;
var BLUE = 2;
var HUE = 3;
var SATURATION = 4;
var BRIGHTNESS = 5;
var NRED = 6;
var NGREEN = 7;
var NBLUE = 8;
var NHUE = 9;
var NSATURATION = 10;
var NBRIGHTNESS = 11;

function getChannel( c , channel) {
  var ch = channel>5?channel-6:channel;
  var cc;

  switch(ch) {
    case RED: cc = red(c); break;
    case GREEN: cc = green(c); break;
    case BLUE: cc = blue(c); break;
    case HUE: cc = hue(c); break;
    case SATURATION: cc = saturation(c); break;
    default: cc= brightness(c); break;
  }

  return channel>5?255-cc:cc;
}
