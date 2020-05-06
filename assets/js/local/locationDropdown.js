/**
 * Toggles the dropdown menu
 */
function toggleDropdown() {
  document
    .getElementById('location-list')
    .classList.toggle('location-dropdown__list-open');
  document
    .querySelector('.location-dropdown__button-arrow')
    .classList.toggle('location-dropdown__button-arrow-up');
}

/**
 * Adds or removes the class hidden to determine which cards are
 * shown on the page
 *
 * @param {Element} element
 * @param {String} hideOrShow
 */
function addOrRemoveHiddenClass(element, hideOrShow) {
  if (hideOrShow === 'hide') {
    element.classList.add('hidden');
  } else if (hideOrShow === 'show') {
    element.classList.remove('hidden');
  }
}

/**
 * Check if input does not match current location
 *
 * @param {String} city name of city to compare
 * @returns {Boolean} if city input is equal to current location
 */
function isCurrentCity(city) {
  const currentLocation = document.querySelector(
    '.location-dropdown__button-text'
  ).innerHTML;

  return currentLocation === city;
}

/**
 * Determines if a card is hidden or shown on the home page
 *
 * @param {String} city
 * @param {String} location
 * @param {Boolean} hasHiddenClass
 * @returns {String}
 */
function hideOrShowCard(city, location, hasHiddenClass) {
  if ((city === location || location === 'All Places') && hasHiddenClass) {
    return 'show';
  }

  if (city !== location && location !== 'All Places' && !hasHiddenClass) {
    return 'hide';
  }

  return '';
}

/**
 * Determines if a location is hidden or shown on the dropdown menu
 *
 * @param {String} location
 * @param {String} elementId
 * @returns {String} Whether to hide or show the given location
 */
const hideOrShowLocation = (location, elementId) => (elementId === location) ? 'hide' : 'show';

/**
 * Determines which elements are shown on a page based on the
 * city in the dropdown menu. If the location is not equal to the city
 * or location does not equal 'All Places', then the cards are hidden.
 * @param {HTMLCollection} allCards
 * @param {String} location
 */
function selectLocation(allCards, location) {
  Array.from(allCards).forEach(card => {
    const cityAndState = card.getElementsByClassName('place-card__city')[0]
      .innerHTML;
    const city = cityAndState.split(',')[0];
    const hasHiddenClass = card.classList.contains('hidden');
    const hideOrShow = hideOrShowCard(city, location, hasHiddenClass);
    addOrRemoveHiddenClass(card, hideOrShow);
  });
}

/**
 * Determine if an item in the dropdown menu is hidden or shown based on the
 * id of the location selected
 * @param {String} location
 * @param {NodeList} locationListElements
 */
function hideLocationInDropdown(location, locationListElements) {
  Array.from(locationListElements).forEach(element => {
    const elementId = element.id;
    const hideOrShow = hideOrShowLocation(location, elementId);

    addOrRemoveHiddenClass(element, hideOrShow);
  });
}

/**
 * Change location to selected one then hide it from the option list
 * and toggle the dropdown
 *
 */
function onLocationDropdownClick() {
  const location = this.id;

  const allCards = document.getElementsByClassName('place-card__list-item');
  const mainButton = document.getElementById('location-dropdown__button-main');
  const locationListElements = document.getElementsByClassName(
    'location-dropdown__list-button'
  );

  selectLocation(allCards, location);
  hideLocationInDropdown(location, locationListElements);
  toggleDropdown();

  mainButton.getElementsByClassName(
    'location-dropdown__button-text'
  )[0].innerHTML = location;
}

/**
 * Attach event listener to call `onLocationDropdownClick` when selection changes
 * @param {Element} element type of HTML element being clicked
 */
function addSelectionListener(element) {
  element.addEventListener('click', onLocationDropdownClick);
}

/**
 *Determines which city options are renderend in the dropdown based on the current selected city
 */
function showDropdownOptions() {
  const locationFilter = [];
  let locationListHtml = '';

  const allCards = document.getElementsByClassName('place-card__list-item');
  const locationDropdown = document
    .getElementById('location-list')
    .getElementsByTagName('ul')[0];

  Array.from(allCards).forEach(card => {
    const cityAndState = card.getElementsByClassName('place-card__city')[0]
      .innerHTML;

    const city = cityAndState.split(',')[0];

    if (!locationFilter.includes(city) && !isCurrentCity(city)) {
      locationFilter.push(city);

      locationListHtml += `
          <li><button id="${city}" class="location-dropdown__list-button">
            ${city}
          </button></li>`;
    }
  });

  const currentLocation = document.querySelector(
    '.location-dropdown__button-text'
  ).innerHTML;

  if (currentLocation !== 'All Places') {
    let allPlacesButton = `
      <li><button id="All Places" class="location-dropdown__list-button">All Places</button></li>`;
    locationListHtml = allPlacesButton += locationListHtml;
    locationFilter.push('All Places');
  }

  locationDropdown.innerHTML = locationListHtml;
  toggleDropdown();

  for (let i = 0; i < locationFilter.length; i++) {
    addSelectionListener(
      document.getElementById('location-list').getElementsByTagName('button')[i]
    );
  }
}

const dropdownButton = document.getElementById(
  'location-dropdown__button-main'
);

if (dropdownButton) {
  dropdownButton.addEventListener('click', showDropdownOptions);
}

if (typeof module !== 'undefined') {
  module.exports = {
    toggleDropdown,
    hideOrShowCard,
    hideOrShowLocation,
    addOrRemoveHiddenClass,
    hideLocationInDropdown,
    selectLocation,
    onLocationDropdownClick,
    isCurrentCity,
    addSelectionListener,
    showDropdownOptions,
  };
}
