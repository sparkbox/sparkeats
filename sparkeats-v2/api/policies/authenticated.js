/**
 * api/policies/authenticated.js
 * 
 * This example shows how to use the HTTP Basic authentication strategy using the passport-http module.
 * Other strategies (Digest, OAuth, OAuth2, etc) can be similarly implemented.
 * 
**/

var express = require("express"),
    app = express(),
    passport = require("passport");

app.use(passport.initialize());


module.exports = function (req, res, ok) {
    passport.authenticate("basic", {
        session: false
    }, function (err, user, info) {
        if (err || !user) {
            res.set("WWW-Authenticate", "Basic realm=\"Restricted\"");
            return res.send("You are not permitted to perform this action", 401);
        }

        req.session.user = user;
        return ok(null, user);
        
    })(req, res, ok);
};