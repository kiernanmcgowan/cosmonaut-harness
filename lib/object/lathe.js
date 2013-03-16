// lathe.js

var object = require('../object');
var t = require('three');

module.exports = object.inherit({

  defaults: {
    points: 10,
    segments: 10,
    phiStart: 10,
    phiLength: 2
  },

  init: function() {
    var points = this.get('points');
    var segments = this.get('segments');
    var phiStart = this.get('phiStart');
    var phiLength = this.get('phiLength');

    // cached geomentry
    var geo = new t.LatheGeometry(points, segments, phiStart, phiLength);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});