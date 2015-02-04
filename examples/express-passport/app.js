var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , TequilaStrategy = require('passport-tequila').Strategy;

// Wiring up Passport session management.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing. However, since this example does not
// have a database of user records, the complete Tequila session state is
// serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

/**
 * The Passport `verify' function, to be provided by the application.
 *
 * To keep the example simple, the user's Tequila session data is returned to
 * represent the logged-in user. In a more sophisticated application, you could
 * fetch a user record object from your database (using the Tequila user profile.user),
 * and call done(null, obj) with that object instead.

 * @param accessToken
 * @param refreshToken
 * @param profile
 * @param {function} done Called as done(e) in case of error, and done(null, userObj) in case of success
 */
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Tequila
// profile), and invoke a callback with a user object.
function myVerify(accessToken, refreshToken, profile, done) {
    // Pretend the verification is asynchronous (as would be required
    // e.g. if using a database):
    process.nextTick(function () {
        done(null, profile);
    });
}

// Use the TequilaStrategy within Passport.
var tequila = new TequilaStrategy({
    service: "Demo Tequila App in node.js",
}, myVerify);
passport.use(tequila);

var app = express.createServer();
// configure Express
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res){
    res.render('index', { user: req.user });
});

// This is how you Tequila-protect a page:
app.get('/private', tequila.ensureAuthenticated, function(req, res){
    res.render('private', { user: req.user });
});

app.listen(process.env.PORT || 3000);
console.log('Demo server listening on port ' + app.address().port);
