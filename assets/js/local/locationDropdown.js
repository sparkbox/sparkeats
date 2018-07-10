'use strict';
function toggleDropdown() {
  document
    .querySelector('.location-dropdown__list')
    .classList.toggle('location-dropdown__list-open');
}

function hideOrShowCard(city, location, hasHiddenClass) {
  if ((city === location || location === 'All Places') && hasHiddenClass) {
    return 'show';
  }

  if (city !== location && location !== 'All Places' && !hasHiddenClass) {
    return 'hide';
  }

  return '';
}

function hideOrShowLocation(location, elementId, hasHiddenClass) {
  if (elementId === location && !hasHiddenClass) {
    return 'hide';
  } else if (elementId !== location && hasHiddenClass) {
    return 'show';
  }

  return '';
}

function addOrRemoveHiddenClass(element, hideOrShow) {
  if (hideOrShow === 'hide') {
    element.classList.add('hidden');
  } else if (hideOrShow === 'show') {
    element.classList.remove('hidden');
  }
}

function hideLocationInDropdown(location, locationListElements) {
  Array.from(locationListElements).forEach(element => {
    const elementId = element.id;
    const hasHiddenClass = element.classList.contains('hidden');
    const hideOrShow = hideOrShowLocation(location, elementId, hasHiddenClass);
    addOrRemoveHiddenClass(element, hideOrShow);
  });
}

function selectLocation(allCards, location) {
  Array.from(allCards).forEach(card => {
    const cityAndState = card.querySelector('.place-card__city').innerHTML;
    const city = cityAndState.split(',')[0];
    const hasHiddenClass = card.classList.contains('hidden');
    const hideOrShow = hideOrShowCard(city, location, hasHiddenClass);
    addOrRemoveHiddenClass(card, hideOrShow);
  });
}

function onLocationDropdownClick() {
  const location = this.id;
  const allCards = document.querySelectorAll('.place-card__list-item');
  const mainButton = document.querySelector('.location-dropdown__button');
  const locationListElements = document.querySelectorAll(
    '.location-dropdown__list-button'
  );

  selectLocation(allCards, location);
  hideLocationInDropdown(location, locationListElements);
  toggleDropdown();

  mainButton.querySelector(
    '.location-dropdown__button-text'
  ).innerHTML = location;
}

function addSelectionListener(element) {
  element.addEventListener('click', onLocationDropdownClick);
}

function isNotCurrentCity(city) {
  const currentLocation = document.querySelector(
    '.location-dropdown__button-text'
  ).innerHTML;

  return currentLocation !== city;
}

function showDropdownOptions() {
  let locationFilter = [];
  let locationListHtml = '';
  const allCards = document.querySelectorAll('.place-card__list-item');
  const locationDropdown = document.querySelector('.location-dropdown__list');

  Array.from(allCards).forEach(card => {
    const cityAndState = card.querySelector('.place-card__city').innerHTML;
    const city = cityAndState.split(',')[0];

    if (!locationFilter.includes(city) && isNotCurrentCity(city)) {
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
      document.querySelectorAll('.location-dropdown__list-button')[i]
    );
  }
}

const dropdownButton = document.querySelector('.location-dropdown__button');
dropdownButton.addEventListener('click', showDropdownOptions);
