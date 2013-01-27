// material

var backbone = require('backbone');
var t = require('three');

module.exports = backbone.Model.extend({

  defaults: {
    'material': null,
    'color': 0xFF9900
  },

  initialize: function() {
    var color = this.get('color');
    this.set('material', new t.MeshLambertMaterial({
      color: color
    }));
  }

});

