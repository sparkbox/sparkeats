// Require Handlebars
const Handlebars = require('handlebars');

// Require FS
const fs = require('fs');

// Require yamljs
const YAML = require('yamljs');

// Require globby
const globby = require('globby');

// Define the template
const template = fs.readFileSync('source/templates/layouts/default.hbs');

// Compile the template
const render = Handlebars.compile(template.toString());

// Define the data
const yml = fs.readFileSync('source/data/data.yml');

// Parse the data to a json file
const data = YAML.parse(yml.toString());

// Rendering the template
console.log(render(data));


//for each readfilesync globby handlebars
