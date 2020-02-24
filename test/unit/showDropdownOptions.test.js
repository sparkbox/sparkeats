const { expect } = require('chai');
const jsdom = require('jsdom');
const {
  showDropdownOptions,
} = require('../../assets/js/local/locationDropdown');

const { JSDOM } = jsdom;

const dom = new JSDOM(`

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
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
    <section class="place-card">
      <header class="place-card__header">
        <a href="/places/1">

        </a>
      </header>

      <h3 class="place-card__name">
        <a class="place-card__name-link" href="/places/1">Bourbon Street Grill</a>
      </h3>
      <p class="place-card__city">Dayton, OH</p>

      <div class="place-card__star-rating" aria-label="5 stars">
        <!-- average star rating -->
        <img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true">
      </div>

      <address class="sparkeats-address">
        <p>
          1043 Brown Street
        </p>

        <p><a class="sparkeats-address__phone" href="tel:(937) 610-0083">(937) 610-0083</a></p>

      </address>

      <div class="sparkeats-address__url">
        <a class="sparkeats-address__url-link" href="https://www.facebook.com/BourbonSyreetGrillandCafe1043/">Visit
          Site</a>
      </div>


      <a class="place-card__footer-link" href="/places/1">
        <!-- number of reviews -->

        3 Reviews

      </a>

    </section>
  </li>
  <li class="place-card__list-item">
    <section class="place-card">
      <header class="place-card__header">
        <a href="/places/2">

        </a>
      </header>

      <h3 class="place-card__name">
        <a class="place-card__name-link" href="/places/2">Jimmy Johns</a>
      </h3>
      <p class="place-card__city">Columbus, OH</p>

      <div class="place-card__star-rating" aria-label="1 star">
        <!-- average star rating -->
        <img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true"><img
          class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true">
      </div>

      <address class="sparkeats-address">
        <p>
          1157 Brown Street
        </p>

        <p><a class="sparkeats-address__phone" href="tel:(937) 226-2600">(937) 226-2600</a></p>

      </address>

      <div class="sparkeats-address__url">
        <a class="sparkeats-address__url-link" href="https://www.jimmyjohns.com">Visit Site</a>
      </div>


      <a class="place-card__footer-link" href="/places/2">
        <!-- number of reviews -->

        1 Review

      </a>

    </section>
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
