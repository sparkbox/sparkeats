/* eslint-disable no-underscore-dangle */
const sinon = require('sinon');
const jsdom = require('jsdom');
const {
  addSelectionListener,
  __RewireAPI__,
} = require('../../assets/js/local/locationDropdown');

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
    __RewireAPI__.__Rewire__(
      'onLocationDropdownClick',
      onLocationDropdownClickSpy
    );
  });
  afterEach(() => {
    __RewireAPI__.__ResetDependency__('onLocationDropdownClick');
  });
  it.only('adds click event handler', () => {
    const buttonElement = document.querySelector('button');
    addSelectionListener(buttonElement);
    buttonElement.click();
    sinon.assert.calledOnce(onLocationDropdownClickSpy);
  });
});
