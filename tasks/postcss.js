'use strict';

const shell = require('shelljs');

// use postcss to parse CSS and add vendor prefixes to CSS rules
shell.exec('postcss --use autoprefixer -c ./tasks/postcss.config.json public/assets/css/main.css -d public/assets/css');
