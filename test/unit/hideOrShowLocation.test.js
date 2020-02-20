const { hideOrShowLocation } = require('../../assets/js/local/locationDropdown');
const { expect } = require('chai');

describe('HideOrShowLocation', () => {
  it('returns hide if elementId === location and hasHiddenClass === false', () => {
    const result = hideOrShowLocation('Dayton', 'Dayton', false);
    expect(result).to.equal('hide');
  });

  it('returns show if elementId !== location and hasHiddenClass === true', () => {
    const result = hideOrShowLocation('Dayton', 'Memphis', true);
    expect(result).to.equal('show');
  });

  it('returns empty string if elementId === location and hasHiddenClass === true', () => {
    const result = hideOrShowLocation('Dayton', 'Dayton', true);
    expect(result).to.equal('');
  });

  it('returns empty string if elementId !== location and hasHiddenClass === false', () => {
    const result = hideOrShowLocation('Dayton', 'New York City', false);
    expect(result).to.equal('');
  });
});
