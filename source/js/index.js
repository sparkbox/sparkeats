'use strict';

const locationDropdown = require('./LocationDropdown');

const dropdownButton = document.getElementById('location-dropdown__button-main');

dropdownButton.addEventListener('click', locationDropdown.toggleDropdown);
