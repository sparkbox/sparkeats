const { expect } = require('chai');

const ratingToString = require('../../lib/ratingToString');

describe('ratingToString - takes a number and gives correct string equivalent', () => {
  it('should display "stars" if number of stars is greater than 1', () => {
    const threeStars = ratingToString(3);

    expect(threeStars).to.equal('3 stars');
  });

  it('should display "star" if number of stars is 1', () => {
    const oneStar = ratingToString(1);

    expect(oneStar).to.equal('1 star');
  });

  it('should display "stars" if number of stars is 0', () => {
    const zeroStars = ratingToString(0);

    expect(zeroStars).to.equal('0 stars');
  });
});
