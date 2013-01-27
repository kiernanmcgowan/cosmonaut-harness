// cube.js

var object = require('../object');
var t = require('three');

module.exports = object.extend({

  defaults: {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments, 1,
    heightSegments, 1,
    depthSegments, 1,
    material: null
  },

  initialize: function() {
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



