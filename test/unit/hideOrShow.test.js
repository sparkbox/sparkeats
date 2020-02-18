global.document = {
  getElementById: () => null
};
const { hideOrShowCard } = require('../../assets/js/local/locationDropdown');
const { expect } = require('chai');

describe('Hide or show card', () => {
  it('returns show for All Places and hasHiddenClass = true', () => {
    const result = hideOrShowCard("", "All Places", true);
    expect(result).to.equal('show');
  });

  it('returns show when city = location and hasHiddenClass = true', () => {
    const result = hideOrShowCard("Dayton", "Dayton", true);
    expect(result).to.equal('show');
  });
});
