'use strict';

const fs = require('fs');
const Handlebars = require('handlebars');
const YAML = require('yamljs');
const registerPartials = require('./register-partials');
const helpers = require('./lib/sparkeats-handlebars-helpers');
const mkdirp = require('mkdirp');
const sortingData = require('./lib/sorting-data');

registerPartials('source/partials/*.hbs');
helpers.register(Handlebars);

function createTemplate(file) {
  const html = fs.readFileSync(file).toString();
  return Handlebars.compile(html);
}

function prepareReviewsPageData(placeKey, reviewsDataPath) {
  const reviews = YAML.load(reviewsDataPath);
  const keys = Object.keys(reviews);
  const placeReviews = {};
  keys.forEach((key) => {
    const review = reviews[key];
    const placeId = review['place-id'];
    if (placeId === placeKey) {
      placeReviews[key] = review;
    }
  });
  return placeReviews;
}

function prepareData(placesDataPath, reviewsDataPath) {
  const places = YAML.load(placesDataPath);
  const keys = Object.keys(places);
  const data = [];
  const sortedKeys = sortingData.sortKeysByLocationAndPlace(places, keys);
  sortedKeys.forEach((key) => {
    const place = places[key];
    const reviews = prepareReviewsPageData(key, reviewsDataPath);
    const numberOfReviews = Object.keys(reviews).length;
    const placeData = {
      'place-id': key,
      'place': place,
      'reviews': reviews,
      'numberOfReviews': numberOfReviews
    };
    data.push(placeData);
  });
  return data;
}

function createIndexPage(templatePath, newFilePath, placesDataPath, reviewsDataPath) {
  const indexPageTemplate = createTemplate(templatePath);
  const filePath = `${newFilePath}/index.html`;
  const writeFile = fs.writeFileSync(filePath, indexPageTemplate(prepareData(placesDataPath, reviewsDataPath)));
}

function createReviewsPages(templatePath, newFilePath, placesDataPath, reviewsDataPath) {
  const reviewsPageTemplate = createTemplate(templatePath);
  const keys = Object.keys(YAML.load(placesDataPath));
  const data = prepareData(placesDataPath, reviewsDataPath);
  keys.forEach((key) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]['place-id'] === key) {
        const filePath = `${newFilePath}/${key}.html`;
        const individualPlaceData = data[i];
        mkdirp(newFilePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
        const writeFile = fs.writeFileSync(filePath,
        reviewsPageTemplate(individualPlaceData));
      }
    }
  });
}

createIndexPage('source/pages/index.hbs', 'dist', 'public/data/places.yml', 'public/data/reviews.yml');
createReviewsPages('source/pages/review.hbs', 'dist/reviews', 'public/data/places.yml', 'public/data/reviews.yml');
