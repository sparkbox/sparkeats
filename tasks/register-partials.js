const globby = require('globby');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

// This script registers partials using Handlebars

function registerPartials() {
    const files = globby.sync('source/partials/*.hbs');

    files.forEach( function(file) {
        const html = fs.readFileSync(file).toString();
        const fileName = path.basename(file, '.hbs');
        const partial = Handlebars.registerPartial(fileName, html);
    });
}

module.exports = registerPartials;
