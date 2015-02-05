# Passport-Tequila

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Tequila](http://tequila.epfl.ch/).

This module lets you authenticate and controll access using Tequila in
your Node.js applications that use a
[Connect](http://www.senchalabs.org/connect/)-style middleware,
including [Express](http://expressjs.com/). Plain old Node.js servers
will also be supported at some point in the future (but don't work
right now).

## Installation

    $ npm install passport-tequila

## Usage

### Example Code

See [the express and passport demo
app](https://github.com/epfl-sti/passport-tequila/tree/master/examples/express-passport)
for a working example (requires a Tequila server in your domain, which
means it is most likely to work from inside EPFL).

### Configuring the Strategy

    var tequila = require('passport-tequila');
    var myStrategy = new tequila.Strategy({
        service: "The name of my app",  // Appears on Tequila login screen
        request: ["displayname", "firstname"],  // Personal info to fetch
      },
      function(userKey, profile, done) {
        User.findOrCreate(profile, function (err, user) {
          done(err, user);
        });
      }
    );
    passport.use(myStrategy);

### Protecting Routes

Tequila is designed so that Web apps redirect unauthenticated users to
the Tequila server, which redirects back to the protected page or
resource the user started from.

In a Node.js app, this is achieved by using the
`'myStrategy.ensureAuthenticated'` function as middleware:

  app.get('/private', tequila.ensureAuthenticated, function(req, res){
      // .. business as usual
  });

## User Authentication Details

When the user is authenticated (regardless of whether the page they
are on uses the tequila.ensureAuthenticated middleware mentioned
above), `'req.user'` holds the user's identity as fetched from the
Tequila server:

     req.user.displayName  // Conforms to http://passportjs.org/guide/profile/
     req.user.tequila.key  // Tequila-specific additions

Note that e.g. `'req.user.displayName'` only appears if it was explicitly
requested from Tequila (see above, Configuring the Strategy).

### Logging Out

To log out the user from this app only:

  app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
  });

Alternatively, one can also log out from Tequila altogether like this.

  app.get('/globallogout', myStrategy.globalLogout("/"));

## License

(The MIT License)

Copyright (c) 2015 Ecole Polytechnique Federale de Lausanne, Switzerland

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
