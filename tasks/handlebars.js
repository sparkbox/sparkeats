const globby = require('globby');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const YAML = require('yamljs');

// This script compiles Handlebar templates, data
// and writes a new HTML file in the public/ directory
// New files are created with the same name as the Handlebar template.
// Existing files are replaced.

const data = YAML.load('source/data/data.yml');
const files = globby.sync('source/pages/*.hbs');

files.forEach( function(file) {
    const html = fs.readFileSync(file).toString();
    const template = Handlebars.compile(html);
    const fileName = path.basename(file, '.hbs');
    const newFilePath = `public/${fileName}.html`;

    const writeFile = fs.writeFileSync(newFilePath, template(data));
});
