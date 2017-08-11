'use strict';

function toggleDropdown() {
  document.getElementById('location-list').classList.toggle('location-dropdown__list-open');
}

function selectLocation() {
  const location = this.id;
  const allCards = document.getElementsByClassName('place-card__list-item');
  for (let i = 0; i < allCards.length; i += 1) {
    const card = allCards[i];
    const cityAndState = card.getElementsByClassName('place-card__city')[0].innerHTML;
    const city = cityAndState.split(',')[0];
    const hasHiddenClass = card.classList.contains('place-card__list-item-hidden');
    if (city !== location && !hasHiddenClass) {
      card.classList.add('place-card__list-item-hidden');
    } else if (city === location && hasHiddenClass) {
      card.classList.remove('place-card__list-item-hidden');
    }
  }
}

function addSelectionListener(element) {
  element.addEventListener('click', selectLocation);
}

module.exports = {
  toggleDropdown,
  addSelectionListener,
};
