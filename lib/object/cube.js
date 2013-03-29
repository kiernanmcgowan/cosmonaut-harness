// cube.js

var object = require('../object');

module.exports = object.extend({

  defaults: object.prototype.setDefaults({
    width: 30,
    height: 30,
    depth: 30,
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
    this.t = require('cosmonaut-harness').three;
    // cached geomentry
    var geo = new THREE.CubeGeometry(width, height, depth,
                                 widthSegments, heightSegments, depthSegments);

    this.set('geo', geo);
    this.set('mesh', new THREE.Mesh(geo));
  }

});
