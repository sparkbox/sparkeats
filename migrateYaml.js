const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('@sailshq/lodash');

const placesPath = './data/places.yml';
const reviewsPath = './data/reviews.yml';

function parseYaml(yamlPath) {
  let obj;

  try {
    obj = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
  } catch (err) {
    console.log(err);
  }

  return obj;
}

module.exports = {
  places: parseYaml(placesPath),
  reviews: parseYaml(reviewsPath),
};
