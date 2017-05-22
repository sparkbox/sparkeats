const Handlebars = require('handlebars');
const fs = require('fs');
const YAML = require('yamljs');
const globby = require('globby');
const srxp = require('simple-regexp');


// Define the templates
  // Creates an array of file paths (strings)
  // pulls from the pages directory
  // TODO include partials and layouts
const templates = globby.sync('source/pages/*.hbs');

// Loop through the array of templates
templates.forEach( function(template) {

// =================== PREP TEMPLATE =============================

    // Define the content
    const html = fs.readFileSync(template.toString());

    // Compile the template
    const compileTemplate = Handlebars.compile(html.toString());

    // Change file extension from .hbs to .html
    const newFileExtension = srxp(template).match('.hbs').replace('.html').text();

    // Change file path to html build directory
    // Currently only pulls from pages/
    // TODO include partials and layouts
    const newFilePath = srxp(newFileExtension).match('source/pages/').replace('public/').text();

// =================== PREP DATA =============================

    // Define the data
    const yml = fs.readFileSync('source/data/data.yml');

    // Parse the data to JSON
    const data = YAML.parse(yml.toString());

// =================== COMBINE TEMPLATE & DATA =============================

    // Builds the html file using the template and data
    const writeFile = fs.writeFileSync(newFilePath, compileTemplate(data));
});
