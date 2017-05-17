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

    // Render the template
    const renderTemplate = Handlebars.compile(html.toString());

    // Smoosh together the data and template and generate an html file
    // TODO How do we create a flexible file name? Do we keep the name from the template?
    const writeFile = fs.writeFileSync('public/assets/html/that.html', renderTemplate(data));
});
