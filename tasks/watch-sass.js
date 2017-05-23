'use strict';

const shell = require('shelljs');

// using onchange - also throws an exec: internal error upon quitting
shell.exec("onchange 'source/scss/*.scss' -- npm run styles");
