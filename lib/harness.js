// harness.js

// object strap
module.exports.scene = require('./render/scene');
module.exports.object = require('./object');

module.exports.primitive = {
  sphere: require('./object/sphere')
};

module.exports.material = require('./material');
module.exports.light = require('./light');
// event strap

// render strap

// physics strap

