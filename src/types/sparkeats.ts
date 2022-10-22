export type Location = {
  id: number;
  name: string;
  city: string;
  region: string;
  country: string;
  address: string;
  phone: string;
  url: string;
  locationURL: string;
  imageURL: string;
  imageDescription: string;
  reviews: Review[];
};

export type Review = {
  id: number;
  reviewerName: string;
  text: string;
  imageURL: string;
  imageDescription: string;
  starRating: number;
  placeID: number;
};
