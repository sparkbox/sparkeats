import type { Location, Review } from './types/sparkeats';

const selectLocations = (city: string, locations?: Location[]) =>
  city === 'All Cities'
    ? locations
    : locations?.filter((location) => location.city === city);

// Fix problem with separate state trees and optional properties
export function reducer(
  state: {
    location?: Location;
    review?: Review;
    locations?: Location[];
    selectedLocations?: Location[];
    city?: string;
  },
  action: { type: string; data: any }
) {
  const { locations, location, review } = state;

  switch (action.type) {
    case 'select_city': {
      return {
        ...state,
        city: action.data.city,
        selectedLocations: selectLocations(action.data.city, locations),
      };
    }
    case 'update_location': {
      return {
        ...state,
        location: {
          ...location,
          ...action.data,
        },
      };
    }
    case 'update_review': {
      return {
        ...state,
        review: {
          ...review,
          ...action.data,
        },
      };
    }
    case 'set_location': {
      return {
        ...state,
        location: action.data,
      };
    }
    case 'set_locations': {
      return {
        ...state,
        locations: action.data,
        selectedLocations: action.data,
      };
    }
  }
  throw Error(`Unknown action: ${action.type}`);
}
