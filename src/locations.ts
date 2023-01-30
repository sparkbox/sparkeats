/**
 * Locations
 * @module locations
 * This module transforms the legacy location data into an updated `locations` object.
 * The data was migrated from SQL tables to JSON and image files using the `migrate_sparkeats.cljs` script.
 */

import React, { useContext } from 'react';
import legacyPlaces from '../data/place.json';
import legacyReviews from '../data/review.json';
import legacyPlaceImages from '../data/placeImage.json';
import legacyReviewImages from '../data/reviewImage.json';
import { Locations, Location, Review } from './types/sparkeats';

type LegacyPlace = {
  createdAt: number;
  updatedAt: number;
  id: number;
  placeName: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  placeImage: string;
  fd: string;
  placeImageAlt: string;
  placeURL: string;
  placeWebsiteDisplay: string;
};

type LegacyImage = {
  createdAt: number;
  updatedAt: number;
  fd: string;
  file: { type: string; data: number[] };
  id: number;
};

type LegacyReview = {
  createdAt: number;
  updatedAt: number;
  id: number;
  reviewText: string;
  reviewerName: string;
  numberOfStars: number;
  reviewImage: string;
  reviewImageAlt: string;
  placeId: number;
};

const BASE_URL = import.meta.env['BASE_URL'];

function getReviewImageURL(
  imagePath: string,
  imageID: string,
  legacyImages: LegacyImage[]
) {
  const imageName = legacyImages.find(
    (image) => image.id.toString() === imageID
  )?.fd;
  return imageName ? `${BASE_URL}${imagePath}${imageName}` : null;
}

function getLocationImageURL(
  imagePath: string,
  imageID: string,
  legacyImages: LegacyImage[]
) {
  const imageName = legacyImages.find(
    (image) => image.id.toString() === imageID
  )?.fd;
  return imageName
    ? `${BASE_URL}${imagePath}${imageName}`
    : `${BASE_URL}img/background-fallback.svg`;
}

function getImageDescription(imageDescription: string) {
  return imageDescription || 'Placeholder image description';
}

export function getLocationURL(id: number): string {
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
}: LegacyReview): Review {
  return {
    id,
    reviewerName,
    text,
    imageURL: getReviewImageURL('img/reviews/', imageID, legacyReviewImages),
    imageDescription: getImageDescription(reviewImageAlt),
    starRating,
    placeID,
  };
}

function getReviews(placeID: number) {
  return legacyReviews
    .filter((legacyReview) => legacyReview.placeId === placeID)
    .map(transformReview);
}

function getReviewCountText(reviewCount: number): string {
  return reviewCount !== 1 ? `${reviewCount} Reviews` : `${reviewCount} Review`;
}

function mapLocation(
  locationMap: { [key: string]: Location },
  location: Location
): { [key: string]: Location } {
  return {
    [location.id]: location,
    ...locationMap,
  };
}

function transformLocations(legacyPlaces: LegacyPlace[]): Locations {
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
          imageURL: getLocationImageURL(
            'img/locations/',
            imageID,
            legacyPlaceImages
          ),
          imageDescription: getImageDescription(placeImageAlt),
          reviews,
          reviewCountText: getReviewCountText(reviews.length),
        };
      }
    )
    .reduce(mapLocation, {});
}

function getUniqueCities(locations: Locations): string[] {
  return Array.from(
    new Set(Object.values(locations).map((location) => location.city))
  );
}

const locations = transformLocations(legacyPlaces);
const uniqueCities = getUniqueCities(locations);
const LocationsContext = React.createContext(locations);

export { locations, uniqueCities };

export const LocationsProvider = LocationsContext.Provider;

export const useLocations = () => useContext(LocationsContext);
