'use strict';

function toggleDropdown() {
  document
    .getElementById('location-list')
    .classList.toggle('location-dropdown__list-open');
}

function hideOrShowCard(city, location, hasHiddenClass) {
  if ((city === location || location === 'All Places') && hasHiddenClass) {
    return 'show';
  } else if ((city !== location && location !== 'All Places') && !hasHiddenClass) {
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
  Array.from(locationListElements).forEach((element) => {
    const elementId = element.id;
    const hasHiddenClass = element.classList.contains('hidden');
    const hideOrShow = hideOrShowLocation(location, elementId, hasHiddenClass);
    addOrRemoveHiddenClass(element, hideOrShow);
  });
}

function selectLocation(allCards, location) {
  Array.from(allCards).forEach((card) => {
    const cityAndState = card.getElementsByClassName('place-card__city')[0]
      .innerHTML;
    const city = cityAndState.split(',')[0];
    const hasHiddenClass = card.classList.contains('hidden');
    const hideOrShow = hideOrShowCard(city, location, hasHiddenClass);
    addOrRemoveHiddenClass(card, hideOrShow);
  });
}

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

function addSelectionListener(element) {
  element.addEventListener('click', onLocationDropdownClick);
}

module.exports = {
  toggleDropdown,
  hideOrShowCard,
  addSelectionListener,
  hideOrShowLocation,
};
