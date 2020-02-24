const rewire = require('rewire');
const { expect } = require('chai');
const sinon = require('sinon');
const jsdom = require('jsdom');

const { addSelectionListener as rewireApi } = rewire(
  '../../assets/js/local/locationDropdown'
);

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <button></button>
    </body>
  </html>`
);

const { document } = dom.window;

describe('addSelectionListener', () => {
  let onLocationDropdownClickSpy;
  beforeEach(() => {
    onLocationDropdownClickSpy = sinon.spy();
    //console.log(locationDropdown.__set__);
    rewireApi.__set__(
      'onLocationDropdownClick',
      onLocationDropdownClickSpy
    );
  });
  afterEach(() => {
    // global.onLocationDropdownClick = onLocationDropdownClick;
  });
  it.only('adds click event handler', () => {
    const buttonElement = document.querySelector('button');
    addSelectionListener(buttonElement);
    buttonElement.click();
    sinon.assert.calledOnce(onLocationDropdownClickSpy);
  });
});
