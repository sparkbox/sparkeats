'use strict';

const path = require('path');
const globby = require('globby');
const inform = require('../lib/inform');
const sass = require('node-sass');
const shell = require('shelljs');

const PRODUCTION = process.env.NODE_ENV === 'production';

let outputStyle = '--output-style ' + (PRODUCTION ? 'compressed' : 'expanded');
