'use strict';

const locationDropdown = require('./location-dropdown');

const dropdownButton = document.getElementById('location-dropdown__button-main');
const dropdownOptions = document.getElementsByClassName('location-dropdown__list-button');

dropdownButton.addEventListener('click', locationDropdown.toggleDropdown);

for (let i = 0; i < dropdownOptions.length; i += 1) {
  locationDropdown.addSelectionListener(dropdownOptions[i]);
}
