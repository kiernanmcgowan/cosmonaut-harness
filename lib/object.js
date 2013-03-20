// object.js
// objects are anything that can that can appear on screen (besides the UI)
// they are specialized backbone models that have utility methods for rendering and physics

var backbone = require('backbone');
var _ = require('underscore');

var objectModel = backbone.Model.extend({

  defaults: {
    x: 0,
    y: 0,
    z: 0,
    mesh: null,
    material: null
  },

  initialize: function(config) {
    this.on('change:material', this.updateMaterial, this);
    this.on('change:mesh', this.updateMesh, this);
    this.on('change:x change:y change:z', this.setPostion, this);

    this.init();
    this.setPostion();
  },

  setDefaults: function(def) {
    return _.extend(def, objectModel.prototype.defaults);
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
  },

  setPostion: function() {
    if (this.get('mesh')) {
      var x = this.get('x');
      var y = this.get('y');
      var z = this.get('z');

      this.get('mesh').position.x = x;
      this.get('mesh').position.y = y;
      this.get('mesh').position.z = z;
    }
  },

  updateMaterial: function() {
    // kinda lame double material proc
    this.get('mesh').material = this.get('material').get('material');
  },

  // bind 3d events from the mesh to this
  updateMesh: function() {
    console.log('mesh functions');
    console.log(_.functions(this.get('mesh')));
    var self = this;
    this.get('mesh').on('click', function() {
      console.log('click');
    });
    this.get('mesh').on('mouseover', function() {
      console.log('mouseover');
    });
    this.get('mesh').on('mouseout', function() {
      console.log('mouseout');
    });
  }

});

module.exports = objectModel;
