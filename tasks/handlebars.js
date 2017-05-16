const Handlebars = require('handlebars');
const fs = require('fs');
const YAML = require('yamljs');
const globby = require('globby');


// Define the templates
  // Creates an array of file paths (strings)
  // pulls from pages, layouts, and partials directories
const templates = globby.sync('source/templates/**/*.hbs');

// Loop through the array of templates
templates.forEach( function(template) {

    // Define the content (html)
    const html = fs.readFileSync(template.toString());

    // Define the data
    const yml = fs.readFileSync('source/data/data.yml');

    // Parse the data to a json file
    const data = YAML.parse(yml.toString());

    // Render the template
    const render = Handlebars.compile(html.toString());

    // Render the data
    console.log(render(data));
});
