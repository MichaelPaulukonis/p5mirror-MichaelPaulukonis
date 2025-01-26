// Load the SVG file
function preload() {
  svgData = loadStrings("path706.svg");
}

// Parse the SVG data and extract the path data
function setup() {
  createCanvas(400, 400);
  background(255);

  let paths = [];
  let currentPath = "";
  let insidePath = false;

  var parser = new DOMParser();
  var doc = parser.parseFromString(svgData.join(""), "image/svg+xml");
  const yourSvgElement = doc
    .getElementsByTagNameNS("http://www.w3.org/2000/svg", "svg")
    .item(0);
  // doc.documentElement.lastChild.children[0]
  // TODO: study how to pull out better than the non-working string mess, below

  debugger;
  for (let i = 0; i < svgData.length; i++) {
    let line = svgData[i].trim();

    if (line.startsWith("<path")) {
      insidePath = true;
      currentPath = line;
    } else if (line.startsWith("</path>")) {
      insidePath = false;
      paths.push(currentPath);
      currentPath = "";
    } else if (insidePath) {
      currentPath += line;
    }
  }

  // Draw the paths
  noFill();
  stroke(0);
  strokeWeight(2);

  debugger;
  for (let path of paths) {
    beginShape();
    let d = path.split('d="')[1].split('"')[0];
    let commands = d.match(/[a-z][^a-z]*/gi);

    for (let command of commands) {
      let type = command.charAt(0);
      let args = command
        .substring(1)
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat);

      if (type === "M") {
        moveTo(args[0], args[1]);
      } else if (type === "L") {
        lineTo(args[0], args[1]);
      } else if (type === "C") {
        bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5]);
      }
    }
    endShape();
  }
}
