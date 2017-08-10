'use strict';

function toggleDropdown() {
  console.log('toggleDropdown');
  document.getElementById('location-list').classList.toggle('location-dropdown__list-open');
}

module.exports = {
  toggleDropdown,
};
