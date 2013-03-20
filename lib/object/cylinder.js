// cylinder.js

var object = require('../object');
var t = require('three');

module.exports = object.inherit({

  defaults: {
    radiusTop: 10,
    radiusBottom: 10,
    height: 10,
    radiusSegments: 2,
    heightSegments: 2,
    openEnded: true
  },

  init: function() {
    var radiusTop = this.get('radiusTop');
    var radiusBottom = this.get('radiusBottom');
    var height = this.get('height');
    var radiusSegments = this.get('radiusSegments');
    var heightSegments = this.get('heightSegments');
    var openEnded = this.get('openEnded');

    // cached geomentry
    var geo = new t.CylinderGeometry(radiusTop, radiusBottom, height,
                                 radiusSegments, heightSegments, openEnded);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});
