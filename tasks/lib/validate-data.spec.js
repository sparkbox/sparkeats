'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('checkValidationOfData', () => {

  it('should report that the places data has passed validation', () => {
    const checkPlacesData = require('../../tasks/lib/validate-data.js').isPlacesDataValid;
    expect(checkPlacesData).to.be.true;
  });
  it('should report that the reviews data has passed validation', () => {
    const checkReviewsData = require('../../tasks/lib/validate-data.js').isReviewsDataValid;
    expect(checkReviewsData).to.be.true;
  });
});
