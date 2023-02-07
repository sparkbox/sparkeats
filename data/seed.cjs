/**
 * Seed Sparkeats data
 * @module seed
 * This module transforms the legacy Sparkeats data into an updated `locations` object.
 * The data was migrated from SQL tables to JSON and image files using the `migrate_sparkeats.cljs` script.
 */
const { initializeApp } = require('firebase/app');
const { doc, getFirestore, writeBatch } = require('firebase/firestore');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

const places = require('./place.json');
const reviews = require('./review.json');
// const placeImages = require('./data/placeImage.json');
// const reviewImages = require('./data/reviewImage.json');

const placeImages = {
  12: 'canal-street.jpg',
  42: '2nd-street-market.jpg',
  62: 'bagger-daves.jpg',
  32: 'basils-on-market.jpg',
  52: 'bareburger.jpg',
  82: 'cocos-bistro.jpg',
  92: 'ginger-and-spice.jpg',
  102: 'jeet-india.jpg',
  112: 'gaucho-heather-1.jpg',
};

const reviewImages = {
  152: 'cocos-bistro-catherine-1.jpg',
  162: 'basils-on-market-catherine-1.jpg',
  122: 'basils-heather.jpg',
  132: 'ginger-and-spice-catherine-1.jpg',
  172: 'jeet-india-catherine-1.jpg',
};

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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage();

function getImageDescription(imageDescription) {
  return imageDescription || 'Placeholder image description';
}

async function getImageURL(id, type, images) {  
  const imageURL = images[id] ? await getDownloadURL(ref(storage, `legacy/${type}/${images[id]}`)) : '';

  return imageURL; 
}

function getLocationURL(id) {
  return `locations/${id}`;
}

async function transformReview({
  id,
  reviewerName,
  reviewText: text,
  numberOfStars: starRating,
  reviewImage: imageID,
  reviewImageAlt,
  placeId: placeID,
}) {
  const imageURL = await getImageURL(id, 'reviews', reviewImages);
  
  return {
    id,
    reviewerName,
    text,
    imageURL,
    imageDescription: getImageDescription(reviewImageAlt),
    starRating,
    placeID,
  };
}

async function getReviews(placeID) {
  return Promise.all(reviews
    .filter((review) => review.placeId === placeID)
    .map(transformReview));
}

function transformLocations(places) {
  return Promise.all(places.map(
    async ({
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
      const reviews = await getReviews(id);
      const imageURL = await getImageURL(id, 'places', placeImages);

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
        imageURL,
        imageDescription: getImageDescription(placeImageAlt),
        reviews,
      };
    }
  ));
}

async function seedLocations(places) {
  const locations = await transformLocations(places);
  const batch = writeBatch(db);

  locations.forEach((location) => {
    const docRef = doc(db, 'locations', location.id.toString());
    batch.set(docRef, location);
  });

  await batch.commit();

  console.log('Seeded Sparkeats data.');
}

seedLocations(places);
