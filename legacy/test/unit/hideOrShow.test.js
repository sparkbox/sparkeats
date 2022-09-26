const { hideOrShowCard } = require('../../assets/js/local/locationDropdown');
const { expect } = require('chai');

describe('Hide or show card', () => {
  it('returns show for All Places and hasHiddenClass = true', () => {
    const result = hideOrShowCard('', 'All Places', true);
    expect(result).to.equal('show');
  });

  it('returns show when city = location and hasHiddenClass = true', () => {
    const result = hideOrShowCard('Dayton', 'Dayton', true);
    expect(result).to.equal('show');
  });

  it('returns hide when location != All Places and city != location and hasHiddenClass = false', () => {
    const result = hideOrShowCard('', 'Dayton', false);
    expect(result).to.equal('hide');
  });

  it('returns empty string when city != location and location != All Places and hasHiddenClass = true', () => {
    const result = hideOrShowCard('', 'Ohio', true);
    expect(result).to.equal('');
  });
});
