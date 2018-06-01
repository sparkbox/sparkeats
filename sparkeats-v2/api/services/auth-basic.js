/**
 * api/services/auth-basic.js
 * 
 * Basic authentication strategy is defined here.
 * Other strategies can be defined as needed by adding files like this to the services folder.
 * 
**/

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    compare = require('tsscmp');

passport.use(new BasicStrategy(function(username, password, next) {
    if(check(username, password)){
      next(null, true);
    } else {
      next('not authorized');
    }
}));

// Basic function to validate credentials for example
function check (name, pass) {
  var valid = true

  // Simple method to prevent short-circut and use timing-safe compare
  valid = compare(name, process.env.AUTH_USERNAME) && valid
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid

  return valid
}