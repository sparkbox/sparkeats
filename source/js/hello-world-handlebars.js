// Require Handlebars
var Handlebars = require('handlebars');

// Require FS
var fs = require('fs');

// Require yamljs
var YAML = require('yamljs');

// Define the template
var template = fs.readFileSync('source/templates/layouts/default.hbs');

// Compile the template
var render = Handlebars.compile(template.toString());

// Define the data
var yml = fs.readFileSync('source/data/data.yml');

// Parse the data to a json file
var data = YAML.parse(yml.toString());

// Rendering the template
console.log(render(data));
