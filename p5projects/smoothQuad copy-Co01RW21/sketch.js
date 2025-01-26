p5.prototype.smoothQuad = function(x1, y1, x2, y2, x3, y3, x4, y4, detailX, detailY) {
  if (typeof detailX === 'undefined') {
    detailX = 8;
  }
  if (typeof detailY === 'undefined') {
    detailY = 8;
  }

  const gId = `smoothQuad|${x1}|${y1}|${x2}|${y2}|${x3}|${y3}|${x4}|${y4}|${detailX}|${detailY}`;

  if (!this._renderer.geometryInHash(gId)) {
    const smoothQuadGeom = new p5.Geometry(detailX, detailY, function() {
      //algorithm adapted from c++ to js
      //https://stackoverflow.com/questions/16989181/whats-the-correct-way-to-draw-a-distorted-plane-in-opengl/16993202#16993202
      let xRes = 1.0 / (this.detailX - 1);
      let yRes = 1.0 / (this.detailY - 1);
      for (let y = 0; y < this.detailY; y++) {
        for (let x = 0; x < this.detailX; x++) {
          let pctx = x * xRes;
          let pcty = y * yRes;

          let linePt0x = (1 - pcty) * x1 + pcty * x4;
          let linePt0y = (1 - pcty) * y1 + pcty * y4;
          let linePt1x = (1 - pcty) * x2 + pcty * x3;
          let linePt1y = (1 - pcty) * y2 + pcty * y3;

          let ptx = (1 - pctx) * linePt0x + pctx * linePt1x;
          let pty = (1 - pctx) * linePt0y + pctx * linePt1y;

          this.vertices.push(new p5.Vector(ptx, pty));
          this.uvs.push([pctx, pcty]);
        }
      }
    });

    //compute faces
    smoothQuadGeom.faces = [];

    for (let y = 0; y < detailY - 1; y++) {
      for (let x = 0; x < detailX - 1; x++) {
        let pt0 = x + y * detailX;
        let pt1 = (x + 1) + y * detailX;
        let pt2 = (x + 1) + (y + 1) * detailX;
        let pt3 = x + (y + 1) * detailX;
        smoothQuadGeom.faces.push([pt0, pt1, pt2]);
        smoothQuadGeom.faces.push([pt0, pt2, pt3]);
      }
    }
    smoothQuadGeom
      .computeNormals()
      ._makeTriangleEdges()
      ._edgesToVertices();
    this._renderer.createBuffers(gId, smoothQuadGeom);
  }
  this._renderer.drawBuffersScaled(gId, 1, 1, 1);

  return this;
}

let img;
let vecTL, vecTR, vecBL, vecBR;

function preload() {
  img = loadImage("https://openprocessing-usercontent.s3.amazonaws.com/files/user65884/visual842202/he6128441d41d0d8183206c127e7ee065/griduv.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let size = min(height, width) * 0.4;
  vecTL = createPoint(-size, -size); //TOP LEFT
  vecTR = createPoint(size, -size); //TOP RIGHT
  vecBR = createPoint(size, size); //BOTTOM LEFT
  vecBL = createPoint(-size, size); //BOTTOM RIGHT
}

function createPoint(x, y) {
  let vec = createVector(x, y);
  addDrag(vec);
  return vec;
}

function draw() {
  background(255);

  texture(img);
  smoothQuad(vecTL.x, vecTL.y, vecTR.x, vecTR.y, vecBR.x, vecBR.y, vecBL.x, vecBL.y);

  drawDrag();
}

function mousePressed() {
  dragMousePressed();
}

function mouseReleased() {
  dragMouseReleased();
}

function mouseDragged() {
  dragMouseDragged();
}