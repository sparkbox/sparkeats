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
      let imgName = { imgName: '' };
      let result = template(imgName);
      expect(result).to.equal('');
    });
  });
  describe('if there is an image file name', () => {
    it('should return the path to the image location in the reviews folder', () => {
      let imgName = { imgName: 'test.jpg' };
      let result = template(imgName);
      expect(result).to.equal('/assets/images/reviews/test.jpg');
    });
  });
});
