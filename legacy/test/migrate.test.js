const { expect } = require('chai');
const { places, reviews } = require('../migrate');

describe('Sparkeats 1.0 data', () => {
  it('has 40 places', () => {
    expect(Object.keys(places)).to.have.length(40);
  });

  it('has 51 reviews', () => {
    expect(Object.keys(reviews)).to.have.length(51);
  });

  xit('has 23 place images', () => {});
  xit('has 15 review images', () => {});
});
