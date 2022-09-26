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
        return res
          .status(401)
          .send('You are not permitted to perform this action');
      }

      req.session.user = user;
      return ok(null, user);
    }
  )(req, res, ok);
}

module.exports = authenticate;
