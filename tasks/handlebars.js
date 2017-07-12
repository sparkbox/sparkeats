
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const YAML = require('yamljs');
const registerPartials = require('./register-partials');

const readFile = (file) => fs.readFileSync(file, 'utf8');
const ymlName = (filePath) => path.basename(filePath, '.yml');

// This script compiles Handlebar templates, data, and partials
// and writes a new HTML file in the public/ directory
// New files are created with the same name as the Handlebar template.
// Existing files are replaced.

const getData = () => {
  let dataFiles = 'data/*';
  let dataFilePaths = path.join('source/', `${ dataFiles }.yml`);
  let glob = globby.sync(dataFilePaths);
  return glob.reduce((data, file) => {
    let key = ymlName(file);
    let val = YAML.parse(readFile(file));
    data[key] = val;
    return data;
  }, {});
};

registerPartials('source/partials/*.hbs');
const data = getData;
const files = globby.sync('source/pages/*.hbs');

files.forEach(function (file) {
  const html = fs.readFileSync(file).toString();
  const template = Handlebars.compile(html);
  const fileName = path.basename(file, '.hbs');
  const newFilePath = `public/${fileName}.html`;

  const writeFile = fs.writeFileSync(newFilePath, template(getData()));
});
