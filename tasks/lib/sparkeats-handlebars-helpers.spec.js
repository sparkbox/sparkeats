'use strict';

const chai = require('chai');
const Handlebars = require('handlebars');
const sparkeatsHelpers = require('./sparkeats-handlebars-helpers.js');

const expect = chai.expect;

let html;
let template;
let result;

sparkeatsHelpers.register(Handlebars);

describe('getImageLocation', () => {
  before(() => {
    html = '{{getImageLocation name placeOrReview}}';
    template = Handlebars.compile(html);
    result = (imgName, placeOrReview) => template({ name: imgName, placeOrReview: placeOrReview });
  });
  describe('if there is no image file name', () => {
    it('should return default background image', () => {
      expect(result('', '')).to.equal('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    });
  });
  describe('if there is an image file name', () => {
    describe('if it is a place image', () => {
      it('should return the path to the image location in the places folder', () => {
        expect(result('test.jpg', 'place')).to.equal('/assets/images/places/test.jpg');
      });
    });
    describe('if it is a reviews image', () => {
      it('should return the path to the image location in the reviews folder', () => {
        expect(result('test.jpg', 'review')).to.equal('/assets/images/reviews/test.jpg');
      });
    })
  });
});

describe('getReviewOrReviews', () => {
  before(() => {
    html = '{{getReviewOrReviews reviewCount}}';
    template = Handlebars.compile(html);
    result = count => template({ reviewCount: count });
  });
  describe('if there are zero reviews', () => {
    it('should return "0 Reviews"', () => {
      expect(result(0)).to.equal('0 Reviews');
    });
  });
  describe('if there is one review', () => {
    it('should return "1 Review"', () => {
      expect(result(1)).to.equal('1 Review');
    });
  });
  describe('if there is more than one review', () => {
    it('should return "x Reviews"', () => {
      expect(result(3)).to.equal('3 Reviews');
    });
  });
});

describe('getReviewPageLink', () => {
  before(() => {
    html = '{{getReviewPageLink place-id}}';
    template = Handlebars.compile(html);
    result = placeId => template({ 'place-id': placeId });
  });
  it('should return the link as a string', () => {
    expect(result('pasha')).to.be.a('string');
  });
  it('should return a link that points to the reviews folder', () => {
    expect(result('pasha')).to.include('/reviews/');
  });
  it('should return a link to a file with the same name as the place-id', () => {
    expect(result('pasha')).to.include('/pasha.html');
  });
});

describe('getNumberOfStars', () => {

  const filledStar = '<img class="place-card__star" src="/assets/design/sparkeats_star.svg" alt="review star">';
  const halfStar = '<img class="place-card__star" src="/assets/design/sparkeats_star_half.svg" alt="review star">';
  const emptyStar = '<img class="place-card__star" src="/assets/design/sparkeats_star_empty.svg" alt="review star">';

  before(() => {
    html = '{{getNumberOfStars numberOfStars}}';
    template = Handlebars.compile(html);
    result = numberOfStars => template({ numberOfStars });
  });
  describe('if there is a star rating of 1', () => {
    it('should return 1 filled star and 4 empty stars', () => {
      const oneStar = filledStar + emptyStar + emptyStar + emptyStar + emptyStar;
      expect(result(1)).to.equal(oneStar);
    });
  });
  describe('if there is a star rating of 1.5', () => {
    it('should return 1 filled star, 1 half star and 3 empty stars', () => {
      const onePointFiveStars = filledStar + halfStar + emptyStar + emptyStar + emptyStar;
      expect(result(1.5)).to.equal(onePointFiveStars);
    });
  });
  describe('if there is a star rating of 2', () => {
    it('should return 2 filled stars and 3 empty stars', () => {
      const twoStars = filledStar + filledStar + emptyStar + emptyStar + emptyStar;
      expect(result(2)).to.equal(twoStars);
    });
  });
  describe('if there is a star rating of 2.5', () => {
    it('should return 2 filled stars, 1 half star and 2 empty stars', () => {
      const twoPointFiveStars = filledStar + filledStar + halfStar + emptyStar + emptyStar;
      expect(result(2.5)).to.equal(twoPointFiveStars);
    });
  });
  describe('if there is a star rating of 3', () => {
    it('should return 3 filled stars and 2 empty stars', () => {
      const threeStars = filledStar + filledStar + filledStar + emptyStar + emptyStar;
      expect(result(3)).to.equal(threeStars);
    });
  });
  describe('if there is a star rating of 3.5', () => {
    it('should return 3 filled stars, 1 half star and 1 empty star', () => {
      const threePointFiveStars = filledStar + filledStar + filledStar + halfStar + emptyStar;
      expect(result(3.5)).to.equal(threePointFiveStars);
    });
  });
  describe('if there is a star rating of 4', () => {
    it('should return 4 filled stars and 1 empty star', () => {
      const fourStars = filledStar + filledStar + filledStar + filledStar + emptyStar;
      expect(result(4)).to.equal(fourStars);
    });
  });
// add 4.5 stars
  describe('if there is a star rating of 4.5', () => {
    it('should return 4 filled stars and 1 half star', () => {
      const fourPointFiveStars = filledStar + filledStar + filledStar + filledStar + halfStar;
      expect(result(4.5)).to.equal(fourPointFiveStars);
    });
  });
  describe('if there is a star rating of 5', () => {
    it('should return 5 filled stars', () => {
      const fiveStars = filledStar + filledStar + filledStar + filledStar + filledStar;
      expect(result(5)).to.equal(fiveStars);
    });
  });
  describe('if there is no star rating', () => {
    it('should return an empty string', () => {
      const noStars = '';
      expect(result(null)).to.equal(noStars);
    });
  });
});
