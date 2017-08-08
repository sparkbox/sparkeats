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

function loadYamlData(dataFilePath) {
  return YAML.load(dataFilePath);
}

function createTemplate(file) {
  const html = fs.readFileSync(file).toString();
  return Handlebars.compile(html);
}

function prepareReviewsPageData(placeKey, reviewsData) {
  const keys = Object.keys(reviewsData);
  const placeReviews = {};
  keys.forEach((key) => {
    const review = reviewsData[key];
    const placeId = review['place-id'];
    if (placeId === placeKey) {
      placeReviews[key] = review;
    }
  });
  return placeReviews;
}

function prepareAverageStars(reviewKey, reviewsData) {
  const keys = Object.keys(reviewsData);
  const ratings = [];
  let averageStars;
  let ratingsSum;
  keys.forEach((key) => {
    const review = reviewsData[key];
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

  if (!averageStars) {
    return '';
  }

  averageStars = (Math.round(averageStars * 2) / 2).toFixed(1);
  return averageStars;
}

function prepareData(placesData, reviewsData) {
  const keys = Object.keys(placesData);
  const data = [];
  const sortedKeys = sortingData.sortKeysByLocationAndPlace(placesData, keys);
  sortedKeys.forEach((key) => {
    const place = placesData[key];
    const reviews = prepareReviewsPageData(key, reviewsData);
    const averageStars = prepareAverageStars(key, reviewsData);
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

function createIndexPage(templatePath, newFilePath, placesData, reviewsData) {
  const indexPageTemplate = createTemplate(templatePath);
  const filePath = `${newFilePath}/index.html`;
  const writeFile = fs.writeFileSync(filePath, indexPageTemplate(prepareData(placesData, reviewsData)));
}

function createReviewsPages(templatePath, newFilePath, placesData, reviewsData) {
  const reviewsPageTemplate = createTemplate(templatePath);
  const data = prepareData(placesData, reviewsData);
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

function loadDataAndBuildPages(
  indexTemplatePath,
  reviewsTemplatePath,
  placesDataPath,
  reviewsDataPath) {
  const placesData = loadYamlData(placesDataPath);
  const reviewsData = loadYamlData(reviewsDataPath);
  createIndexPage(indexTemplatePath, 'dist', placesData, reviewsData);
  createReviewsPages(reviewsTemplatePath, 'dist/reviews', placesData, reviewsData);
}

loadDataAndBuildPages('source/pages/index.hbs', 'source/pages/review.hbs', 'public/data/places.yml', 'public/data/reviews.yml');

module.exports = {
  createTemplate,
  prepareReviewsPageData,
  prepareAverageStars,
  prepareData,
  createIndexPage,
  createReviewsPages,
};
