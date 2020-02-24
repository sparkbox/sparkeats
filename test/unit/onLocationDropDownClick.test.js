const { expect } = require('chai');
const jsdom = require('jsdom');
const {
  onLocationDropdownClick,
} = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<html>
    <body>
      <div class='location-dropdown'>
        <button id='location-dropdown__button-main' class='location-dropdown__button'>
          <div class='location-dropdown__button-text'>All Places</div>
        </button>
        <div id='location-list' class='location-dropdown__list'>
          <ul>
            <li id='All Places' class='location-dropdown__list-button'>All Places</li>
            <li id='Dayton' class='location-dropdown__list-button'>Dayton</li>
            <li id='Pittsburgh' class='location-dropdown__list-button'>Pittsburgh</li>
          </ul>
        </div>
      </div>
    </body>
  </html>`
);

const { document } = dom.window;


describe('onLocationDropdownClick', () => {
  let globalDoc;

  beforeEach(() => {
    document.getElementById('location-list')
      .classList.add('location-dropdown__list-open');

    globalDoc = global.document;
    global.document = dom.window.document;
  });

  afterEach(() => {
    global.document =  globalDoc;
  });

  it('Hides the selected location from the options', () => {
    const selectedItem = document.getElementById('Dayton');
    onLocationDropdownClick.call(selectedItem);

    expect(
      selectedItem.classList.contains('hidden')
    ).to.equal(true);
  });

  it('toggles dropdown', () => {
    const selectedItem = document.getElementById('Dayton');
    onLocationDropdownClick.call(selectedItem);

    const dropdownList = document.getElementById('location-list');

    expect(
      dropdownList.classList.contains('location-dropdown__list-open')
    ).to.equal(false);
  });
});
