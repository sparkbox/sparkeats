'use strict';

const shell = require('shelljs');
const browser = require('browser-sync');
const mon = require('nodemon');

shell.exec("nodemon -e scss -x 'npm run styles'");
