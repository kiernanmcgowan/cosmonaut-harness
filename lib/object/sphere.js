// sphere.js
// sphere primative

var object = require('../object');
var t = require('three');

module.exports = object.extend({

  defaults: {
    radius: 10,
    segments: 16,
    rings: 16
  },

  init: function() {
    var r = this.get('radius');
    var seg = this.get('segments');
    var rings = this.get('rings');

    // cahced geomentry
    var geo = new t.SphereGeometry(r, seg, rings);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});

