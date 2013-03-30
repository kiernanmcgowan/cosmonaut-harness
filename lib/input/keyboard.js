// keyboard.js
// basic keyboard input for all types of keys

var backbone = require('backbone');
var _ = require('underscore');

// use the backbone eventing system to bubble keyboard events
var keyboardModel = backbone.Model.extend({

  initialize: function() {
    this.on('inputDown', this.receiveInput, this);
    this.on('inputUp', this.endInput, this);
  },

  // utility methods for common / special keys
  onSpace: function(fn) {
    this.on('space', fn, context);
  },

  onEnter: function(fn, context) {
    this.on('enter', fn, context);
  },

  onKey: function(keyCode, fn, context) {
    if (!_.isArray(keyCode)) {
      this.on(keyCode, fn, context);
    } else {
      var self = this;
      _.each(keyCode, function(code) {
        self.on(code, fn, context);
      });
    }
  },

  // movement helpers
  onLeft: function(fn, context) {
    this.on('left', fn, context);
  },

  onRight: function(fn, context) {
    this.on('right', fn, context);
  },

  onUp: function(fn, context) {
    this.on('up', fn, context);
  },

  onDown: function(fn, context) {
    this.on('down', fn, context);
  },

  onMovement: function(fn, context) {
    this.on('move', fn, context);
  },

  fireInput: function(evt) {
    this.trigger(evt.keyevent.keyCode, evt);
    // special events
    if (evt.keyevent.keyCode == 13) {
      this.trigger('enter', evt);
    }

    if (evt.keyevent.keyCode == 32) {
      this.trigger('space', evt);
    }

    if (evt.keyevent.keyCode == 37 || evt.keyevent.keyCode == 65) {
      this.trigger('left', evt);
      this.trigger('move', evt);
    }

    if (evt.keyevent.keyCode == 38 || evt.keyevent.keyCode == 87) {
      this.trigger('up', evt);
      this.trigger('move', evt);
    }

    if (evt.keyevent.keyCode == 39 || evt.keyevent.keyCode == 68) {
      this.trigger('right', evt);
      this.trigger('move', evt);
    }

    if (evt.keyevent.keyCode == 40 || evt.keyevent.keyCode == 83) {
      this.trigger('down', evt);
      this.trigger('move', evt);
    }
  },

  receiveInput: function(evt) {
    evt.on = true;
    this.fireInput(evt);
  },

  endInput: function(evt) {
    evt.on = false;
    this.fireInput(evt);
  }

});

var keyboard = new keyboardModel();

document.addEventListener('keydown', function(keycode) {
  keyboard.trigger('inputDown', {keyevent: keycode});
});

document.addEventListener('keyup', function(keycode) {
  keyboard.trigger('inputUp', {keyevent: keycode});
});

module.exports = keyboard;
