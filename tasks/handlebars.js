const Handlebars = require('handlebars');
const fs = require('fs');
const YAML = require('yamljs');
const globby = require('globby');


// Define the templates
  // Creates an array of file paths (strings)
  // pulls from the pages directory
  // TODO will include partials and layouts
const templates = globby.sync('source/templates/pages/*.hbs');

// Loop through the array of templates
templates.forEach( function(template) {

    // Define the content (html)
    const html = fs.readFileSync(template.toString());

    // Define the data
    const yml = fs.readFileSync('source/data/data.yml');

    // Parse the data to a json file
    const data = YAML.parse(yml.toString());

    // Compile the template
    const compileTemplate = Handlebars.compile(html.toString());

    // Builds the html file using the template and data
    // TODO How do we create a flexible file name? Do we keep the name from the template?
    const writeFile = fs.writeFileSync('public/assets/html/that.html', compileTemplate(data));
});
