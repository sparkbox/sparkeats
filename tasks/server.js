'use strict';

const shell = require('shelljs');
const express = require('express');
const app = express();
const path = require('path');
const auth = require('marshmallows');
const mrrobot = require('mr.robot');

if (process.env.NODE_ENV === 'production'){
  // start production server
  console.log("You have accessed the production server.");

  // process.env.PORT lets the port be set by Heroku
  const port = process.env.PORT || 5000;

  app.listen(port, function() {
    console.log("Our app is running on http://localhost:" + port);
  });

  // make express look in the public directory for assets
  app.use(auth, express.static(path.join(__dirname, '..')));

  // set X-Robots-Tag HTTP response header
  // app.get('/', function(req, res) {
  //   res.set('X-Robots-Tag', ['robots:noindex']);
  // });
  // app.set('X-Robots-Tag', 'robots:noindex');

  app.get('/', function(req, res) {
    mrrobot(res).noIndex().noFollow();
  });

}
else {
  // start development server to watch and update html and css files
  console.log("You have accessed the development server.");
  shell.exec("browser-sync start --server --files 'public/assets/css/*.css, *.html'");
}
