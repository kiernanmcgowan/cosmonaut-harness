// plane.js
var object = require('../object');
var t = require('three');

module.exports = object.inherit({

  defaults: {
    width: 10,
    height: 10,
    widthSegments: 2,
    heightSegments: 2,
  },

  init: function() {
    var width = this.get('width');
    var height = this.get('height');
    var widthSegments = this.get('widthSegments');
    var heightSegments = this.get('heightSegments');

    // cached geomentry
    var geo = new t.PlaneGeometry(width, height, widthSegments, heightSegments);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});
