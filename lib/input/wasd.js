// wasd.js
// creates basic arrow and wasd controls
// will continually call function DURING keypress rather than on repeat events
// in order to make sure events dont block eachother, setTimout(fn, 0) will be used

var backbone = require('backbone');
var _ = require('underscore');

var keyboard = require('./keyboard');

// use the backbone eventing system to bubble keyboard events
var wasdModel = backbone.Model.extend({

  // how often to trigger functions
  // 30 mill ~30 fps, 15 ~60 fps
  _refreshRate: 30,

  _cbs: {
    left: [],
    right: [],
    up: [],
    down: []
  },

  initialize: function() {
    // bind events to the keyboard input
    // hide special stuff in closure scope
    var intervalObj = {};
    var self = this;

    var onPressFn = function(name, evt) {
      // determine if we are still pressed
      if (evt.on && !intervalObj[name]) {
        intervalObj[name] = setInterval(function() {
          // grab the fn array each time incase new functions are added
          var fns = self._cbs[name];
          _.each(fns, function(fn) {
            setTimeout(function() {
              fn(evt);
            }, 0);
          });
        }, self._refreshRate);
      } else if (!evt.on && intervalObj[name]) {
        clearTimeout(intervalObj[name]);
        delete intervalObj[name];
      }
    };

    keyboard.onLeft(function(evt) {
      onPressFn('left', evt);
    }, this);

    keyboard.onRight(function(evt) {
      onPressFn('right', evt);
    }, this);

    keyboard.onUp(function(evt) {
      onPressFn('up', evt);
    }, this);

    keyboard.onDown(function(evt) {
      onPressFn('down', evt);
    }, this);
  },

  onLeft: function(fn) {
    this._cbs.left.push(fn);
  },

  onRight: function(fn, context) {
    this._cbs.right.push(fn);
  },

  onUp: function(fn, context) {
    this._cbs.up.push(fn);
  },

  onDown: function(fn, context) {
    this._cbs.down.push(fn);
  }

});

// singleton pattern
module.exports = new wasdModel();
