// light.js
// creates a light source

var backbone = require('backbone');
var t = require('three');

module.exports = backbone.Model.extend({

  defaults: {
    'light': null,
    'color': 0xFFAAFF
  },

  initialize: function() {
    var light = new t.PointLight(this.get('color'));
    this.set('light', light);

    light.position.x = 10;
    light.position.y = 50;
    light.position.z = 130;
  }

});
