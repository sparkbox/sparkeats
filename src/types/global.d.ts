export {};

declare global {
  type Location = {
    id: number;
    name: string;
    city: string;
    region: string;
    country: string;
    address: string;
    phone: string;
    url: string;
    imageURL: string;
    imageDescription: string;
    reviews: Review[];
  };

  type Locations = Location[];

  interface Review {
    id: number;
    reviewerName: string;
    text: string; 
    imageURL: string;
    imageDescription: string;
    starRating: number;
    placeID: number;
  };

  type Reviews = Review[];

  type LegacyPlace = {
    createdAt: number,
    updatedAt: number,
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
    file: {type: 'Buffer', data: Number[]};
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
    placeId: number
  };
}
