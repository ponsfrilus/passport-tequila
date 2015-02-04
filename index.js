/**
 * node.js binding for the Tequila SSO system
 *
 * https://tequila.epfl.ch/
 */

var os=require("os");

/**
 * @constructor
 */
var Tequila = module.exports = function() {};

Tequila.prototype.server = function () {
    var hostname_bits = os.hostname().split(".");
    hostname_bits[0] = "tequila";
    return hostname_bits.join(".");
}();
