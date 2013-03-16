// scene.js
// model that sets up a scene

var backbone = require('backbone');
var t = require('three');

var camera = require('./camera');

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
    var webgl = this.get('webgl');

    this.scene = new t.Scene();

    if (webgl) {
      this.renderer = new t.WebGLRenderer();
    } else {
      this.renderer = new t.CanvasRenderer();
    }

    this.camera = new camera({fov: 45, aspect: (width / height),
                              near: 0.1, far: 1000});
    this.camera.move(0, 0, 300);
    this.scene.add(this.camera.get('camera'));

    this.renderer.setSize(width, height);
  },

  attachToDom: function(elem) {
    elem.append(this.renderer.domElement);
  },

  addObject: function(obj) {
    this.scene.add(obj.get('mesh'));
    var self = this;
    obj.on('remove', function() {
      self.scene.remove(obj.get('mesh'));
    });
  },

  addLight: function(light) {
    this.scene.add(light.get('light'));
    var self = this;
    light.on('remove', function() {
      self.scene.remove(light.get('mesh'));
    });
  },

  // renders a single frame
  renderFrame: function() {
    this.renderer.render(this.scene, this.camera.get('camera'));
  },

  startRenderLoop: function() {
    var self = this;
    console.log('starting render loop');
    var frame = function() {
      // fuck yeah clousure!
      requestAnimationFrame(frame);
      self.trigger('prerender');
      self.renderer.render(self.scene, self.camera.get('camera'));
      //sefl.startRenderLoop();
    };

    frame();

  }

});
