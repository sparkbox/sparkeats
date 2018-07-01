const fs = require('fs');
const yaml = require('js-yaml');

const placesPath = './data/places.yml';
const reviewsPath = './data/reviews.yml';

function parseYAML(yamlPath) {
  let obj;

  try {
    obj = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
  } catch (err) {
    console.log(err);
  }

  return obj;
}

module.exports = {
  places: parseYAML(placesPath),
  reviews: parseYAML(reviewsPath),
};
