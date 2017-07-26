'use strict';

const chai = require('chai');
const Handlebars = require('handlebars');
const sparkeatsHelpers = require('./sparkeats-handlebars-helpers.js');

const expect = chai.expect;

let html;
let template;

sparkeatsHelpers.register(Handlebars);

describe('getPlaceImageLocation', () => {
  before(() => {
    html = '{{getPlaceImageLocation imgName}}';
    template = Handlebars.compile(html);
  });
  describe('if there is no image file name', () => {
    it('should return default background image', () => {
      let imgName = { imgName: '' };
      let result = template(imgName);
      expect(result).to.equal('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    });
  });
  describe('if there is an image file name', () => {
    it('should return the path to the image location in the places folder', () => {
      let imgName = { imgName: 'test.jpg' };
      let result = template(imgName);
      expect(result).to.equal('/assets/images/places/test.jpg');
    });
  });
});

describe('getReviewImageLocation', () => {
  before(() => {
    html = '{{getReviewImageLocation imgName}}';
    template = Handlebars.compile(html);
  });
  describe('if there is no image file name', () => {
    it('should return an empty string', () => {
      expect(template({ imgName: '' })).to.equal('');
    });
  });
  describe('if there is an image file name', () => {
    it('should return the path to the image location in the reviews folder', () => {
      expect(template({ imgName: 'test.jpg' })).to.equal('/assets/images/reviews/test.jpg');
    });
  });
});

describe('getReviewOrReviews', () => {
  before(() => {
    html = '{{getReviewOrReviews reviewCount}}';
    template = Handlebars.compile(html);
  });
  describe('if there are zero reviews', () => {
    it('should return "0 Reviews"', () => {
      expect(template({ reviewCount: 0 })).to.equal('0 Reviews');
    });
  });
  describe('if there is one review', () => {
    it('should return "1 Review"', () => {
      expect(template({ reviewCount: 1 })).to.equal('1 Review');
    });
  });
  describe('if there is more than one review', () => {
    it('should return "x Reviews"', () => {
      expect(template({ reviewCount: 3 })).to.equal('3 Reviews');
    });
  });
});
