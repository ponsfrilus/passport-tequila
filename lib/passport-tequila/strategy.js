/**
 * Passport-style API for Tequila.
 */

var passport = require('passport'),
    util = require('util');

/**
 * @constructor
 * @type {Function}
 */
var Strategy = module.exports = function TequilaStrategy() {

};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.name = "tequila";
