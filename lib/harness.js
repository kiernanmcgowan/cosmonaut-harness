// harness.js

// object strap
module.exports.scene = require('./render/scene');
module.exports.object = require('./object');

module.exports.primitive = {
  sphere: require('./object/sphere'),
  cube: require('./object/cube')
};

module.exports.material = require('./material');
module.exports.light = require('./light');
// event strap

// render strap

// physics strap - rename phyijs to physics, what an odd name

