'use strict';

const shell = require('shelljs');
const browsersync = require('browser-sync');
const nodemon = require('nodemon');
const onchange = require('onchange');

// using nodemon works but throws an exec: internal error upon quitting
// shell.exec("nodemon -e scss -x 'npm run styles'");

// using onchange - also throws an exec: internal error upon quitting
shell.exec("onchange 'source/scss/*.scss' -- npm run styles");

// look at using chokidar instead of nodemon
