var sketch = function(p) {
  var newArtObject = artObject;

  p.setup = function() {
    let newPainting = new painting(
      p,
      newArtObject.width,
      newArtObject.height,
      newArtObject.background,
      newArtObject.shapes
    );
    newPainting.paint();
  }
}

// classes
class shapeObject {
  constructor(s, style, color, coords) {
    this.s = s;
    this.style = style;
    this.color = color;
    this.coords = coords;
  }

  paint() {
    // console.log('painting new shape, coords: ' + this.coords + ", style: " + this.style +  ", color: " + this.color);
    this.s.fill(this.color);
    this.s.stroke(20);
    this.s.strokeWeight(4);
    if (this.style == "rounded") {
      // interpolate a point between the first and last coords to make the shape smooth
      let midPoint = [this.coords[0] + this.coords[1] / 2, this.coords[this.coords.length-2] + this.coords[this.coords.length-1] / 2];
      this.s.beginShape();
      // use last point as first control point
      this.s.curveVertex(this.coords[this.coords.length-2], this.coords[this.coords.length-1]);
      // use midPoint as first point
      this.s.curveVertex(midPoint[0], midPoint[1]);
      // iterate over all coordinates
      for (let i = 0; i < this.coords.length; i += 2) {
        this.s.curveVertex(this.coords[i], this.coords[i + 1]);
      }
      // use midPoint as last point
      this.s.curveVertex(midPoint[0], midPoint[1]);
      // use first point as last control point
      this.s.curveVertex(this.coords[0], this.coords[1]);

      this.s.endShape();
      } else if (this.style == "poly") {
      this.s.beginShape();
      // iterate over all coordinates
      for (let i = 0; i < this.coords.length; i += 2) {
        this.s.vertex(this.coords[i], this.coords[i + 1]);
      }
      // go back to first point to close shape
      this.s.vertex(this.coords[0], this.coords[1]);
      this.s.endShape();
    }
  }
}

class painting {
  constructor(p, x, y, bg, shapes) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.bg = bg;
    this.shapes = shapes;
  }

  paint() {
    this.p.canvas = this.p.createCanvas(this.x, this.y);
    this.p.canvas.parent('canvas-container');
    this.p.background(this.bg);

    for (let i = 0; i < this.shapes.length; i++) {
      let newShape = new shapeObject(
        this.p,
        this.shapes[i].style,
        this.shapes[i].color,
        this.shapes[i].coords
      );
      newShape.paint();
    }
  }
}
