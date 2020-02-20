const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>', {
  url: 'http://localhost',
});
global.window = dom.window;
global.document = dom.window.document;
