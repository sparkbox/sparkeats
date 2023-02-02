/**
 * Seed Sparkeats data
 * @module seed
 * This module transforms the legacy Sparkeats data into an updated `locations` object.
 * The data was migrated from SQL tables to JSON and image files using the `migrate_sparkeats.cljs` script.
 */
const { initializeApp } = require('firebase/app');
const {
  doc,
  getFirestore,
  writeBatch,
} = require('firebase/firestore');
const legacyPlaces = require('./data/place.json');
const legacyReviews = require('./data/review.json');
// import legacyPlaceImages from '../data/placeImage.json';
// import legacyReviewImages from '../data/reviewImage.json';

require('dotenv').config();

const {
  VITE_API_KEY: apiKey,
  VITE_AUTH_DOMAIN: authDomain,
  VITE_PROJECT_ID: projectId,
  VITE_STORAGE_BUCKET: storageBucket,
  VITE_MESSAGING_SENDER_ID: messagingSenderId,
  VITE_APP_ID: appId,
  VITE_MEASUREMENT_ID: measurementId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

function getImageDescription(imageDescription) {
  return imageDescription || 'Placeholder image description';
}

function getLocationURL(id) {
  return `locations/${id}`;
}

function transformReview({
  id,
  reviewerName,
  reviewText: text,
  numberOfStars: starRating,
  reviewImage: imageID,
  reviewImageAlt,
  placeId: placeID,
}) {
  return {
    id,
    reviewerName,
    text,
    imageURL: '',
    imageDescription: getImageDescription(reviewImageAlt),
    starRating,
    placeID,
  };
}

function getReviews(placeID) {
  return legacyReviews
    .filter((legacyReview) => legacyReview.placeId === placeID)
    .map(transformReview);
}

function getReviewCountText(reviewCount) {
  return reviewCount !== 1 ? `${reviewCount} Reviews` : `${reviewCount} Review`;
}

function transformLocations(legacyPlaces) {
  return legacyPlaces
    .map(
      ({
        id,
        placeName: name,
        city,
        state: region,
        address,
        phone,
        placeURL: url,
        placeImage: imageID,
        placeImageAlt,
      }) => {
        const reviews = getReviews(id);

        return {
          id,
          name,
          city,
          region,
          country: '',
          address,
          phone,
          url,
          locationURL: getLocationURL(id),
          imageURL: '',
          imageDescription: getImageDescription(placeImageAlt),
          reviews,
          reviewCountText: getReviewCountText(reviews.length),
        };
      }
    )
}

const locations = transformLocations(legacyPlaces);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function seedLocations(locations) {
  const batch = writeBatch(db);

  locations.forEach((location) => {
    const docRef = doc(db, 'locations', location.id.toString());
    batch.set(docRef, location);
  });

  await batch.commit();

  console.log('Seeded Sparkeats data.')
}

seedLocations(locations);



