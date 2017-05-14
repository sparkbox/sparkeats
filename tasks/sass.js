'use strict';

const sass = require('node-sass');
const shell = require('shelljs');

if (process.env.NODE_ENV === 'production'){
  shell.exec('node-sass --output-style compressed source/scss/main.scss public/assets/css/main.css');
}
else {
  shell.exec('node-sass --output-style expanded source/scss/main.scss public/assets/css/main.css');
}

// Next thing to consider: When NODE_ENV is empty, the css should be readable and have source maps setup
