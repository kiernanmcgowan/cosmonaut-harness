// camera.js
// utility methods for moving the camera around

var backbone = require('backbone');
var t = require('three');

module.exports = backbone.Model.extend({

  defaults: {
    fov: 45,
    aspect: 1,
    near: 1,
    far: 1000,
    camera: null,
    // makes the camera continue to look at here even when moving
    lookAtObject: null,
    lookAt: null
  },

  initialize: function() {
    var fov = this.get('fov');
    var aspect = this.get('aspect');
    var near = this.get('near');
    var far = this.get('far');

    var camera = new t.PerspectiveCamera(fov, aspect, near, far);
    this.set('camera', camera);
    this.on('change:lookAtObject', this.updateFocus, this);
  },

  move: function(x, y, z) {
    this.get('camera').position.x += x;
    this.get('camera').position.y += y;
    this.get('camera').position.z += z;
    var lookAt = this.get('lookAt');
    if (lookAt) {
      this.get('camera').lookAt(lookAt);
    }
  },

  updateFocus: function() {
    var obj = this.get('lookAtObject');
    this.set('lookAt', obj.get('mesh').position);
    this.get('camera').lookAt(obj.get('mesh').position);
  }

});
