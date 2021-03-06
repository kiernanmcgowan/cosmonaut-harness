// icosahedron.js

var object = require('../object');
var t = require('three');

module.exports = object.inherit({

  defaults: {
    radius: 1,
    detail: 10,
  },

  init: function() {
    var radius = this.get('radius');
    var detail = this.get('detail');

    // cached geomentry
    var geo = new t.IcosahedronGeometry(radius, detail);

    this.set('geo', geo);
    this.set('mesh', new t.Mesh(geo));
  }

});
