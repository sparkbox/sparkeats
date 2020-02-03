const { expect } = require('chai');
const getNumberOfStars = require('../../lib/getNumberOfStars');

function lookForFilledImageSrc(src) {
  return src === 'src="../design/sparkeats_star.svg"';
}

function lookForEmptyImageSrc(src) {
  return src === 'src="../design/sparkeats_star_empty.svg"';
}

function sourceLength(sourceFunc, rating) {
  return getNumberOfStars(rating)
    .split(' ')
    .filter(sourceFunc).length;
}

describe('getNumberOfStars', () => {
  it('outputs the correct number of filled stars', () => {
    expect(sourceLength(lookForFilledImageSrc, 3)).to.equal(3);
  });

  it('outputs the correct number of empty stars', () => {
    expect(sourceLength(lookForEmptyImageSrc, 3)).to.equal(2);
  });

  it('tests that you can change positive rating and negative rating to any desired string to give the expected output', () => {
    const coffee = 'Mochas are delicious. ';
    const tea = 'Earl grey is too.';
    const stars = getNumberOfStars(3, coffee, tea);
    const expectedOutput =
      'Mochas are delicious. Mochas are delicious. Mochas are delicious. Earl grey is too.Earl grey is too.';

    expect(stars).to.equal(expectedOutput);
  });

  it('outputs five positive ratings and zero negative ratings if given five as an input', () => {
    const positive = 'positive ';
    const negative = 'negative ';
    const stars = getNumberOfStars(5, positive, negative);
    const expectedOutput = 'positive positive positive positive positive ';

    expect(stars).to.equal(expectedOutput);
  });

  it('tests that the user cannot input a rating greater than five', () => {
    const positive = 'positive ';
    const negative = 'negative ';
    const stars = getNumberOfStars(8, positive, negative);
    const expectedOutput = 'positive positive positive positive positive ';

    expect(stars).to.equal(expectedOutput);
  });

  it('tests that the user cannot input a rating lower than zero', () => {
    const positive = 'positive ';
    const negative = 'negative ';
    const stars = getNumberOfStars(-10, positive, negative);
    const expectedOutput = 'negative negative negative negative negative ';

    expect(stars).to.equal(expectedOutput);
  });
});
