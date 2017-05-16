'use strict';

const nodeSass = require('node-sass');
const sassSass = require('sass');
const shell = require('shelljs');

// compile CSS (compressed for production and expanded for development)
if (process.env.NODE_ENV === 'production'){
  shell.exec('node-sass --output-style compressed source/scss/main.scss public/assets/css/main.css');
}
else {
  shell.exec('node-sass --output-style expanded source/scss/main.scss public/assets/css/main.css && sass source/scss/main.scss:public/assets/css/main.css');
}
