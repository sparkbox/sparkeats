const { expect } = require('chai');
const jsdom = require('jsdom');
const { selectLocation } = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <li class="place-card__list-item hidden">
        <p id="dayton" class="place-card__city">Dayton, OH</p>
      </li>
      <li class="place-card__list-item">
        <p id="chicago" class="place-card__city">Chicago, IL</p>
      </li>
    </body>
  </html>`
);

const { document } = dom.window;

describe('selectLocation', () => {
  it('hides selected element if the element has a hidden class', () => {
    const selectedElements = document.querySelectorAll(
      '.place-card__list-item'
    );
    selectLocation(selectedElements, 'Dayton');
    const daytonCard = selectedElements[0];
    expect(daytonCard.classList.contains('hidden')).to.equal(false);
  });

  it('shows the selected element if the element does not have a hidden class', () => {
    const selectedElements = document.querySelectorAll(
      '.place-card__list-item'
    );
    selectLocation(selectedElements, 'Dayton');
    const chicagoCard = selectedElements[1];
    expect(chicagoCard.classList.contains('hidden')).to.equal(true);
  });
});
