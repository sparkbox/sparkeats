const { expect } = require('chai');
const jsdom = require('jsdom');
const {
  showDropdownOptions,
} = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(`

<html lang="en">
<body>
  <button id="location-dropdown__button-main" class="location-dropdown__button">
    <div class="location-dropdown__button-text">Pittsburgh</div>
    <div class="location-dropdown__button-arrow"></div>
  </button>
  <div id='location-list' class='location-dropdown__list'>
      <ul>

      </ul>
  </div
  <ul>
    <li class="place-card__list-item">
        <p class="place-card__city">Dayton, OH</p>
    </li>
    <li class="place-card__list-item">
      <p class="place-card__city">Columbus, OH</p>
          tion>
    </li>
  </ul>
</body>
</html>
`);

describe('ShowDropdownOptions', () => {
  let globalDoc;
  beforeEach(() => {
    globalDoc = global.document;
    global.document = dom.window.document;
  });

  afterEach(() => {
    global.document = globalDoc;
  });

  it('sets the drop-down city options', () => {
    showDropdownOptions();
    const listOptionsNew = document.querySelectorAll(
      '.location-dropdown__list-button'
    );

    expect(listOptionsNew.length).to.equal(3);
  });

  it('has All Places as the first option', () => {
    showDropdownOptions();
    const myList = document.querySelectorAll('.location-dropdown__list-button');

    const innerTextArray = Array.from(myList).map(
      node => node.childNodes[0].nodeValue
    );

    const firstDropdownOption = innerTextArray[0];

    expect(firstDropdownOption).to.equal('All Places');
  });
});
