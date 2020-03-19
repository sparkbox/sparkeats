const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const compare = require('tsscmp');

function validate(name, pass) {
  let valid = true;

  valid = compare(name, process.env.AUTH_USERNAME) && valid;
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid;

  return valid;
}

passport.use(
  new BasicStrategy((username, password, next) => {
    if (validate(username, password)) {
      next(null, true);
    } else {
      next('not authorized');
    }
  })
);

module.exports = { validate };
