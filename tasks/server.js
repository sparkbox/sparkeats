'use strict';

const shell = require('shelljs');
const browser = require('browser-sync');

if (process.env.NODE_ENV === 'production'){
  // start production server
}
else {
  // start development server to watch and update html and css files
  shell.exec("browser-sync start --server --files 'public/assets/css/*.css, *.html'");
}
