'use strict';

const fs = require('fs');
const Handlebars = require('handlebars');
const YAML = require('yamljs');
const registerPartials = require('./register-partials');
const helpers = require('./lib/sparkeats-handlebars-helpers');

registerPartials('source/partials/*.hbs');
helpers.register(Handlebars);

const createTemplate = (file) => {
  const html = fs.readFileSync(file).toString();
  return Handlebars.compile(html);
};

const prepareReviewsPageData = (placeKey) => {
  const reviews = YAML.load('source/data/reviews.yml');
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
};

const prepareData = () => {
  const places = YAML.load('source/data/places.yml');
  const keys = Object.keys(places);
  const data = {};
  keys.forEach((key) => {
    const place = places[key];
    const reviews = prepareReviewsPageData(key);
    data[key] = {
      'place': place,
      'reviews': reviews
    };
  });
  return data;
};

const createIndexPage = () => {
  const indexPageTemplate = createTemplate('source/pages/index.hbs');
  const newFilePath = 'public/index.html';
  const writeFile = fs.writeFileSync(newFilePath, indexPageTemplate(prepareData()));
};

const createReviewsPages = () => {
  const reviewsPageTemplate = createTemplate('source/pages/review.hbs');
  const places = YAML.load('source/data/places.yml');
  const keys = Object.keys(places);
  keys.forEach((key) => {
    const newFilePath = `public/reviews/${key}.html`;
    const data = prepareData();
    const individualPlaceData = data[key];
    const writeFile = fs.writeFileSync(newFilePath, reviewsPageTemplate(individualPlaceData));
  });
};

createIndexPage();
createReviewsPages();
