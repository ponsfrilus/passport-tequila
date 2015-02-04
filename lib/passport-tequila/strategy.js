/**
 * Passport-style API for Tequila.
 */

var debug = require("debug")("passport-tequila:strategy"),
    passport = require('passport'),
    Protocol = require('./protocol.js'),
    util = require('util');

/**
 * @constructor
 * @type {Function}
 *
 * @param {String} opts.service The app-provided service name (like TequilaService in the Apache config)
 * @property ensureAuthenticated Simple middleware to ensure that the user is authenticated.
 *
 * Use this on any resource that needs to be protected, e.g.
 *
 *   app.get('/private', myTequilaStrategy.ensureAuthenticated, function(req, res){
 *      // Serve here – Can access req.user
 *   });
 */
var Strategy = module.exports = function TequilaStrategy(opts, verify) {
    if (! opts) opts = {};
    passport.Strategy.call(this, opts, verify);

    var protocol = new Protocol();
    // TODO: plumb down moar opts
    protocol.service = opts.service || "Some node.js app";

    this.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        debug("Not authenticated at " + req.url);
        protocol.createrequest(req, res, function (err, results) {
            if (err) {
                next(err);
            } else {
                protocol.requestauth(res, results);  // Redirects user to Tequila
            }
        });
    }
};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.name = "tequila";
