'use strict';

const shell = require('shelljs');

// using onchange - throws an exec: internal error upon quitting
shell.exec("onchange 'source/data/data.yml' -- npm run html");
