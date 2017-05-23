const globby = require('globby');
const fs = require('fs');
const Handlebars = require('handlebars');
const srxp = require('simple-regexp');
const YAML = require('yamljs');



// Define the templates
  // Creates an array of file paths (strings)
  // pulls from the pages directory
  // TODO include partials and layouts
const templates = globby.sync('source/pages/*.hbs');

// Loop through the array of templates
templates.forEach( function(template) {

// =================== PREP TEMPLATE =============================

    // Define the content
    // fs.readFileSync returns an object (buffer)
    const html = fs.readFileSync(template);

    // Compile the template
    // Handlebars.compile requires a string and will not take an object
    const compileTemplate = Handlebars.compile(html.toString());

    // Change file extension from .hbs to .html
    const newFileExtension = srxp(template).match('.hbs').replace('.html').text();

    // Change file path to html build directory
    // Currently only pulls from pages/
    // TODO include partials and layouts
    const newFilePath = srxp(newFileExtension).match('source/pages/').replace('public/').text();

// =================== PREP DATA =============================

    // Define the data
    // fs.readFileSync returns an object (buffer)
    const yml = fs.readFileSync('source/data/data.yml');

    // Parse the data to JSON
    // yamljs (YAML) requires a string and will not take an object
    const data = YAML.parse(yml.toString());

// =================== COMBINE TEMPLATE & DATA =============================

    // Builds the html file using the template and data
    const writeFile = fs.writeFileSync(newFilePath, compileTemplate(data));
});
