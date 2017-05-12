'use strict';

const sass = require('node-sass');
const shell = require('shelljs');

shell.exec('node-sass source/scss/main.scss public/assets/css/main.css');

// consider NODE_ENV
