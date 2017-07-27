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
