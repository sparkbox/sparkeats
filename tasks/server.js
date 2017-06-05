'use strict';

const shell = require('shelljs');
const express = require('express');

const app = express();
const path = require('path');
const auth = require('marshmallows');
const noindex = require('./lib/noindex');

if (process.env.NODE_ENV === 'production') {
  // start production server (NODE_ENV=production npm start)
  // process.env.PORT lets the port be set by Heroku
  const port = process.env.PORT || 5000;

  app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
  });

  app.use(noindex);
  // app.use(auth);
  // use express to look to send index.html to server
  app.use(express.static(path.join(__dirname, '../public')));
  // use express to look to send styles and other assets to server
  app.use(express.static(path.join(__dirname, '../source')));
} else {
  // start development server (npm run dev) to watch and update html and css files
  console.log("This is the development server.");
  // shell.exec("browser-sync start --server --index 'public/index.html'  --files 'public/assets/css/*.css, public/*.html'");
  shell.exec("browser-sync start --server --index 'public/index.html' --serveStatic 'public' 'source'");
}
