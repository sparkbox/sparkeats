const { expect } = require('chai');
const { places, reviews } = require('../migrate');

describe('Sparkeats 1.0 data', () => {
  it('has 12 places', () => {
    expect(Object.keys(places)).to.have.length(12);
  });

  it('has 19 reviews', () => {
    expect(Object.keys(reviews)).to.have.length(19);
  });

  xit('has 23 place images', () => {});
  xit('has 15 review images', () => {});
});
