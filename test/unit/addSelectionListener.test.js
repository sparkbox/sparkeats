const { expect } = require('chai');
const jsdom = require('jsdom');
const { addSelectionListener } = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <><>
    </body>
  </html>`
);

describe('addSelectionListener', () => {
  it
});
