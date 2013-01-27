// object.js
// objects are anything that can that can appear on screen (besides the UI)
// they are specialized backbone models that have utility methods for rendering and physics

var backbone = require('backbone');

module.exports = backbone.Model.extend({

  defaults: {
    mesh: null
  },

  render: function() {

  },

  shift: function(x, y, z) {
    this.get('mesh').position.x += x;
    this.get('mesh').position.y += y;
    this.get('mesh').position.z += z;
  },

  scale: function(x, y, z) {
    this.get('mesh').scale.x = x;
    this.get('mesh').scale.y = y;
    this.get('mesh').scale.z = z;
  }

});
