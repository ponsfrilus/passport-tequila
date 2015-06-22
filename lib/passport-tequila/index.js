/**
 * node.js binding for the Tequila SSO system
 *
 * https://tequila.epfl.ch/
 */

var os=require("os");

var tequila = module.exports = {};
//
tequila.Strategy = require("./strategy.js");

/**
 * @constructor
 */
tequila.plain = function () {
    var hostname_bits = os.hostname().split(".");
    hostname_bits[0] = "tequila";
    this.server = hostname_bits.join(".");
};

/**
 * Attempt to authenticate the user with Tequila.
 *
 * @param request
 * @param response
 * @param onSuccess
 * @param opt_options {{onRejected: function(exn)}}
 * @returns {} if the user is authenticated already; null
 *   in all other circumstances.
 */

/**
 * This function is called when authenticate() succeeds.
 *
 * @callback authenticatedCallback
 * @param {{user: "john", org: "MyOrg", host: "host", sessionmax: time}} session
 */

/**
 * This function is called when authenticate() fails permanently.
 *
 * @callback rejectedCallback
 * @param {Exception} error
 */

/**
 * Attempt to authenticate the user with Tequila.
 *
 * This function manages the Tequila cookie transparently.
 *
 * @param request
 * @param response
 * @param {authenticatedCallback} onSuccess Called when authentication succeeds
 * @param {Object} [opt_options] Additional options
 * @param {rejectedCallback} opt_options.onRejected Called if authentication fails permanently
 */
tequila.plain.prototype.authenticate = function (request, response, onSuccess, opt_options) {
    var options = opt_options || {};
    onSuccess({user: "foo", host: "UNKNOWN"});
};
