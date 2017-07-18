'use strict';

const shell = require('shelljs');

shell.exec('webpack --config ./tasks/webpack.config.js -w --color');
