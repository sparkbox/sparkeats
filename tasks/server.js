'use strict';

const shell = require('shelljs');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
const path = require('path');
const noindex = require('./lib/noindex');

require('dotenv').config(path.join(__dirname, '/.env'));

if (process.env.NODE_ENV === 'production') {

  // start production server (NODE_ENV=production npm start)
  // process.env.PORT lets the port be set by Heroku
  const port = process.env.PORT || 5000;

  app.use(sslRedirect());

  app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
  });

  app.use(noindex);

  // use express to look to send index.html to server
  app.use(express.static(path.join(__dirname, '../dist')));
  // use express to look to send styles and other assets to server
  app.use(express.static(path.join(__dirname, '../public')));

} else {
  // start development server (npm run dev) to watch and update html and css files
  shell.exec("browser-sync start --server --index 'dist/index.html' --serveStatic 'dist' 'public'");
}
