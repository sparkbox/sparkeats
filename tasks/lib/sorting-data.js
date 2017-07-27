'use strict';

function sortLocations(placeData, placeKeys) {
  const locationsSet = new Set();
  placeKeys.forEach((key) => {
    locationsSet.add(placeData[key].city);
  });
  const locationsArray = Array.from(locationsSet);
  locationsArray.sort();
  return locationsArray;
}

function sortKeysForIndividualLocations(location, placeData, placeKeys) {
  const locationKeys = [];
  placeKeys.forEach((key) => {
    if (placeData[key].city === location) {
      locationKeys.push(key);
    }
  });
  return locationKeys.sort();
}

function sortKeysByLocationAndPlace(placeData, placeKeys) {
  let sortedKeys = [];
  const locationsArray = sortLocations(placeData, placeKeys);
  locationsArray.forEach((location) => {
    const locationKeys = sortKeysForIndividualLocations(location, placeData, placeKeys);
    sortedKeys = sortedKeys.concat(locationKeys);
  });
  return sortedKeys;
}

module.exports = {
  sortLocations,
  sortKeysForIndividualLocations,
  sortKeysByLocationAndPlace,
};
