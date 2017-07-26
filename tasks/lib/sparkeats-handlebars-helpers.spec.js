'use strict';

const chai = require('chai');
const Handlebars = require('handlebars');
const sparkeatsHelpers = require('./sparkeats-handlebars-helpers.js');

const expect = chai.expect;

let html;
let template;
let result;

sparkeatsHelpers.register(Handlebars);

describe('getPlaceImageLocation', () => {
  before(() => {
    html = '{{getPlaceImageLocation name}}';
    template = Handlebars.compile(html);
    result = imgName => template({ name: imgName });
  });
  describe('if there is no image file name', () => {
    it('should return default background image', () => {
      expect(result('')).to.equal('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    });
  });
  describe('if there is an image file name', () => {
    it('should return the path to the image location in the places folder', () => {
      expect(result('test.jpg')).to.equal('/assets/images/places/test.jpg');
    });
  });
});

describe('getReviewImageLocation', () => {
  before(() => {
    html = '{{getReviewImageLocation name}}';
    template = Handlebars.compile(html);
    result = imgName => template({ name: imgName });
  });
  describe('if there is no image file name', () => {
    it('should return an empty string', () => {
      expect(result('')).to.equal('');
    });
  });
  describe('if there is an image file name', () => {
    it('should return the path to the image location in the reviews folder', () => {
      expect(result('test.jpg')).to.equal('/assets/images/reviews/test.jpg');
    });
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
