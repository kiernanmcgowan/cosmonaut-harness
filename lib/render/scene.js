// scene.js
// model that sets up a scene

var backbone = require('backbone');
var t = require('three');

// a scene is one view port / camera
// a scene will render a set of objects
module.exports = backbone.Model.extend({

  defaults: {
    // false by default b/c not universally supported
    'webgl': false,
    'perspective': false,
    'camera': null,
    'width': 320,
    'height': 180
  },

  renderer: null,

  camera: null,

  scene: null,

  initialize: function() {
    var width = this.get('width');
    var height = this.get('height');

    this.scene = new t.Scene();
    this.renderer = new t.CanvasRenderer();
    this.camera = new t.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.scene.add(this.camera);
    this.camera.position.z = 300;

    this.renderer.setSize(width, height);
  },

  attachToDom: function(elem) {
    elem.append(this.renderer.domElement);
  },

  addObject: function(obj) {
    this.scene.add(obj.get('mesh'));
  },

  addLight: function(light) {
    this.scene.add(light.get('light'));
  },

  // renders a single frame
  renderFrame: function() {
    this.renderer.render(this.scene, this.camera);
  },

  startRenderLoop: function() {
    var self = this;

    var frame = function() {
      // fuck yeah clousure!
      requestAnimationFrame(frame);
      self.trigger('prerender');
      self.renderer.render(self.scene, self.camera);
      //sefl.startRenderLoop();
    };

    frame();

  }

});
