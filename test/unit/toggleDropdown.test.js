const { expect } = require('chai');
const jsdom = require('jsdom');
const { toggleDropdown } = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <div id="location-list" class="location-dropdown__list location-dropdown__list-open"></div>
    </body>
  </html>`
);

const { document } = dom.window;

describe('toggleDropdown', () => {
  let globalDoc;
  beforeEach(() => {
    globalDoc = global.document;
    global.document = dom.window.document;
  });
  afterEach(() => {
    global.document = globalDoc;
  });
  it('toggles location-dropdown__list-open class', () => {
    toggleDropdown();
    const element = document.getElementById('location-list');
    expect(element.classList.contains('location-dropdown__list-open')).to.equal(
      false
    );
  });
});
