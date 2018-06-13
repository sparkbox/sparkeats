const express = require('express');
const passport = require('passport');

const app = express();
app.use(passport.initialize());

function authenticate(req, res, ok) {
  passport.authenticate(
    'basic',
    {
      session: false,
    },
    (err, user) => {
      if (err || !user) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted"');
        return res.send('You are not permitted to perform this action', 401);
      }

      req.session.user = user;
      return ok(null, user);
    }
  )(req, res, ok);
}

module.exports = authenticate;
