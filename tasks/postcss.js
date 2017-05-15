'use strict';

const shell = require('shelljs');
const postcss = require('postcss');
const autofix = require('autoprefixer');

// use postcss to parse CSS and add vendor prefixes to CSS rules
shell.exec('postcss -u autoprefixer -r public/assets/css/main.css');
