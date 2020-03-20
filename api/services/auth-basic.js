const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const compare = require('tsscmp');

const isValid = (name, pass) =>
  compare(name, process.env.AUTH_USERNAME) &&
  compare(pass, process.env.AUTH_PASSWORD);

passport.use(
  new BasicStrategy((username, password, next) =>
    isValid(username, password)
      ? next(null, true)
      : next(null, false, { message: 'not authorized' })
  )
);

module.exports = { isValid };
