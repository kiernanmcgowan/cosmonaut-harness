// camera.js
// utility methods for moving the camera around

var backbone = require('backbone');

var _ = require('underscore');

module.exports = backbone.Model.extend({

  defaults: {
    fov: 45,
    aspect: 1,
    near: 1,
    far: 5000,
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

    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.useQuaternion = true;

    this.set('camera', camera);
    this.on('change:lookAtObject', this.updateFocus, this);
  },

  shift: function(x, y, z) {
    this.get('camera').position.x += x;
    this.get('camera').position.y += y;
    this.get('camera').position.z += z;
    var lookAt = this.get('lookAt');
    if (lookAt) {
      this.get('camera').lookAt(lookAt);
    }
  },

  // moves the camera to a new position
  move: function(x, y, z, opts) {
    opts = _.extend({}, opts, {
      smooth: false,
      steps: 100
    });
    this.get('camera').position.x = x;
    this.get('camera').position.y = y;
    this.get('camera').position.z = z;
  },

  // orbits around a point distance r away
  // if r is not set, will attempt to use the lookAt point
  orbitAroundPoint: function(thetaDelta, phiDelta, point) {
    // get the current angle from camera to point
    var position = this.get('camera').position;
    var offset = position.clone().sub(point);

    // angle from z-axis around y-axis
    var theta = Math.atan2(offset.x, offset.z);

    // angle from y-axis
    var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

    theta += thetaDelta;
    phi += phiDelta;

    // restrict phi to be between desired limits
    phi = Math.max(0, Math.min(Math.PI, phi));

    // restrict phi to be between EPS and PI-EPS
    var EPS = 0.000001;
    phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

    var radius = offset.length();

    offset.x = radius * Math.sin(phi) * Math.sin(theta);
    offset.y = radius * Math.cos(phi);
    offset.z = radius * Math.sin(phi) * Math.cos(theta);

    position.copy(point).add(offset);

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
