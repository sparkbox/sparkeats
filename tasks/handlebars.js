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

function prepareAverageStars(reviewKey, reviewsDataPath) {
  const reviews = YAML.load(reviewsDataPath);
  const keys = Object.keys(reviews);
  const ratings = [];
  let averageStars;
  let ratingsSum;
  keys.forEach((key) => {
    const review = reviews[key];
    const reviewId = review['place-id'];
    const numStars = review['number-of-stars'];
    if (reviewId === reviewKey) {
      ratings.push(numStars);
      // block stmt is best in the scenerio below, error on arrow body style disabled
      // eslint-disable-next-line
      ratingsSum = ratings.reduce((total, num) => {
        return total + num;
      }, 0);
    }
  });
  averageStars = ratingsSum / (ratings.length);
  averageStars = (Math.round(averageStars * 2) / 2).toFixed(1);
  return averageStars;
}

function prepareData(placesDataPath, reviewsDataPath) {
  const places = YAML.load(placesDataPath);
  const keys = Object.keys(places);
  const data = [];
  const sortedKeys = sortingData.sortKeysByLocationAndPlace(places, keys);
  sortedKeys.forEach((key) => {
    const place = places[key];
    const reviews = prepareReviewsPageData(key, reviewsDataPath);
    const averageStars = prepareAverageStars(key, reviewsDataPath);
    const numberOfReviews = Object.keys(reviews).length;
    if (numberOfReviews > 0) {
      const placeData = {
        'place-id': key,
        'place': place,
        'reviews': reviews,
        'numberOfReviews': numberOfReviews,
        'averageStars': averageStars,
      };
      data.push(placeData);
    }
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
  const data = prepareData(placesDataPath, reviewsDataPath);
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const filePath = `${newFilePath}/${data[key]['place-id']}.html`;
    const individualPlaceData = data[key];
    mkdirp(newFilePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    const writeFile = fs.writeFileSync(filePath, reviewsPageTemplate(individualPlaceData));
  });
}

createIndexPage('source/pages/index.hbs', 'dist', 'public/data/places.yml', 'public/data/reviews.yml');
createReviewsPages('source/pages/review.hbs', 'dist/reviews', 'public/data/places.yml', 'public/data/reviews.yml');

module.exports = {
  prepareReviewsPageData,
  prepareAverageStars,
  prepareData,
  createIndexPage,
  createReviewsPages,
};
