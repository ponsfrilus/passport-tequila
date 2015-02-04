/**
 * Passport-style API for Tequila.
 */

var passport = require('passport'),
    protocol = require('./protocol.js'),
    util = require('util');

/**
 * @constructor
 * @type {Function}
 */
var Strategy = module.exports = function TequilaStrategy(opts, verify) {
    if (! opts) opts = {};
    passport.Strategy.call(this, opts, verify);
    this.service = opts.service || "Some node.js app";
};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.name = "tequila";

/**
 * Simple route middleware to ensure that the user is authenticated.
 *
 * Use this on any resource that needs to be protected, e.g.
 *
 *   app.get('/private', myTequilaStrategy.ensureAuthenticated, function(req, res){
 *      // Serve here – Can access req.user
 *   });
 *
 * @param req
 * @param res
 * @param next
 * @returns null
 */
Strategy.prototype.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    console.log("Not authenticated at " + req.url);
    protocol.createrequest(req, res, function (err, results) {
        if (err) {
            serveError(res, err);
        } else {
            res.redirect("/?key=" + results.key); // TODO: not the Right Thing
        }
    }, {
        service: this.service
        // TODO: plumb down moar opts
    })
};

function serveError(res, e) {
    res.writeHead(500, {"Content-Type": "text/plain"});
    res.write("Error\n\n");
    res.write(e.toString());
    res.end();
}