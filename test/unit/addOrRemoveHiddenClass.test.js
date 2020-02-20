const { expect } = require('chai');
const jsdom = require('jsdom');
const {
  addOrRemoveHiddenClass,
} = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <div class='hidden block-1'></div>
      <div class='block-2'></div>
    </body>
  </html>`
);

const { document } = dom.window;

describe('Add Or Remove Hidden Class ', () => {
  it('removes hidden class', () => {
    const blockOne = document.querySelector('.block-1');

    addOrRemoveHiddenClass(blockOne, 'show');

    expect(blockOne.classList.contains('hidden')).to.equal(
      false,
      'hidden class was not removed'
    );
  });

  it('adds hidden class', () => {
    const blockTwo = document.querySelector('.block-2');

    addOrRemoveHiddenClass(blockTwo, 'hide');

    expect(blockTwo.classList.contains('hidden')).to.equal(
      true,
      'hidden class was not added'
    );
  });
});
