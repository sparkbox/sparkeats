
const globby = require('globby');
const fs = require('fs');
const fm = require('front-matter');
const path = require('path');
const Handlebars = require('handlebars');
const YAML = require('yamljs');
const registerPartials = require('./register-partials');

// This script compiles Handlebar templates, data, and partials
// and writes a new HTML file in the public/ directory
// New files are created with the same name as the Handlebar template.
// Existing files are replaced.
// Data is pulled from front-matter

registerPartials('source/partials/*.hbs');
const files = globby.sync('source/pages/*.hbs');


files.forEach( function(file) {
    const html = fs.readFileSync(file).toString();
    const content = fm(html);
    const data = YAML.parse(content.frontmatter);

    const template = Handlebars.compile(content.body);
    const fileName = path.basename(file, '.hbs');
    const newFilePath = `public/${fileName}.html`;

    const writeFile = fs.writeFileSync(newFilePath, template(data));
});
