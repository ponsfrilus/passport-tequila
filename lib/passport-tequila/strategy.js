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

    var self = this;
    this.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        debug("Not authenticated at " + req.url);
        if (req.query && req.query.key) {
            debug("Perhaps user is back from Tequila, with key=" + req.query.key);
            protocol.fetchattributes(req.query.key, function (error, result) {
                if (error) {
                    debug("Tequila error.");
                    next(error);
                } else if (result.status !== "ok") {
                    debug("Tequila status is: " + result.status);
                    throw new Protocol.TequilaServerError("status=" + result.status);
                } else {
                    debug("Tequila login successful.");
                    req.login({
                        id: result.user
                        // TODO: if personal information is in result, propagate it.
                    }, next);
                }
            });
        } else {
            protocol.createrequest(req, res, function (err, results) {
                if (err) {
                    next(err);
                } else {
                    protocol.requestauth(res, results);  // Redirects user to Tequila
                }
            });
        }
    }
};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.name = "tequila";
