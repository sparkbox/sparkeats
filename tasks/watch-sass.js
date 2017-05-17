'use strict';

const shell = require('shelljs');
<<<<<<< 5ae6042a1708483692faa5b1a1ef1c0c55d99967
const browsersync = require('browser-sync');
const nodemon = require('nodemon');
const onchange = require('onchange');

// using nodemon works but throws an exec: internal error upon quitting
// shell.exec("nodemon -e scss -x 'npm run styles'");

// using onchange - also throws an exec: internal error upon quitting
shell.exec("onchange 'source/scss/*.scss' -- npm run styles");

// look at using chokidar instead of nodemon
=======
const browser = require('browser-sync');
const mon = require('nodemon');

shell.exec("nodemon -e scss -x 'npm run styles'");
>>>>>>> feat: add watch script
