// cube.js

var object = require('../object');
var t = require('three');

module.exports = object.extend({

  defaults: object.prototype.setDefaults({
    width: 10,
    height: 10,
    depth: 10,
    widthSegments: 2,
    heightSegments: 2,
    depthSegments: 2
  }),

  init: function() {
    var width = this.get('width');
    var height = this.get('height');
    var depth = this.get('depth');
    var widthSegments = this.get('widthSegments');
    var heightSegments = this.get('heightSegments');
    var depthSegments = this.get('depthSegments');

    // cached geomentry
    var geo = new t.CubeGeometry(width, height, depth,
                                 widthSegments, heightSegments, depthSegments);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});



