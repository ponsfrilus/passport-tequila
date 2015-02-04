/**
 * node.js binding for the Tequila SSO system
 *
 * https://tequila.epfl.ch/
 */

var os=require("os");

var tequila = module.exports = {};

/**
 * @constructor
 */
tequila.plain = function () {
    var hostname_bits = os.hostname().split(".");
    hostname_bits[0] = "tequila";
    this.server = hostname_bits.join(".");
};
