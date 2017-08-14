'use strict';

function toggleDropdown() {
  document.getElementById('location-list').classList.toggle('location-dropdown__list-open');
}

function hideOrShowCard(city, location, hasHiddenClass) {
  if ((city === location || city === 'All Places') && hasHiddenClass) {
    return 'show';
  } else if ((city !== location && city !== 'All Places') && !hasHiddenClass) {
    return 'hide';
  }
  return '';
}

function selectLocation() {
  const location = this.id;
  const allCards = document.getElementsByClassName('place-card__list-item');
  for (let i = 0; i < allCards.length; i += 1) {
    const card = allCards[i];
    const cityAndState = card.getElementsByClassName('place-card__city')[0].innerHTML;
    const city = cityAndState.split(',')[0];
    const hasHiddenClass = card.classList.contains('place-card__list-item-hidden');
    const hideOrShow = hideOrShowCard(city, location, hasHiddenClass);
    if (hideOrShow === 'hide') {
      card.classList.add('place-card__list-item-hidden');
    } else if (hideOrShow === 'show') {
      card.classList.remove('place-card__list-item-hidden');
    }
  }
}

function addSelectionListener(element) {
  element.addEventListener('click', selectLocation);
}

module.exports = {
  toggleDropdown,
  hideOrShowCard,
  addSelectionListener,
};
