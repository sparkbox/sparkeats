'use strict';

const shell = require('shelljs');
//const browser = require('browser-sync');  -- don't need
const express = require('express');
const app = express();
const path = require('path');

if (process.env.NODE_ENV === 'production'){
  // start production server

}
else {
  // start development server to watch and update html and css files
  shell.exec("browser-sync start --server --files 'public/assets/css/*.css, *.html'");
}
