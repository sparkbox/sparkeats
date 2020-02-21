const { expect } = require('chai');
const jsdom = require('jsdom');
const {
  hideOrShowLocation,
  hideLocationInDropdown,
  addOrRemoveHiddenClass,
} = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <button id='dayton' class='location-dropdown_list-button'>Dayton</button>
      <button id='pittsburgh' class='location-dropdown_list-button hidden'>Pittsburgh</button>
    </body>
  </html>`,
  { pretendToBeVisual: true }
);

const { document } = dom.window;

describe('Hide Location In Dropdown', () => {
  const elementList = document.querySelectorAll(
    '.location-dropdown_list-button'
  );
  it('adds hidden class to element', () => {
    hideLocationInDropdown('dayton', elementList);

    const dayton = document.getElementById('dayton');

    expect(dayton.classList.contains('hidden')).to.equal(true);
  });

  it('removes hidden class from', () => {
    hideLocationInDropdown('dayton', elementList);

    const pittsburgh = document.getElementById('pittsburgh');

    expect(pittsburgh.hidden).to.equal(false);
  });

  it('leaves element classList unaltered', () => {
    hideLocationInDropdown('pittsburgh', elementList);

    const pittsburgh = document.getElementById('pittsburgh');

    expect(pittsburgh.classList.contains('hidden')).to.equal(true);
  });
});
