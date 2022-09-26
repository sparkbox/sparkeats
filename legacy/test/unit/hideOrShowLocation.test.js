const { hideOrShowLocation } = require('../../assets/js/local/locationDropdown');
const { expect } = require('chai');

describe('HideOrShowLocation', () => {
  it('hides the city when the element id matches the location', () => {
    const result = hideOrShowLocation('Dayton', 'Dayton', false);
    expect(result).to.equal('hide');
  });

  it('shows the city when the element id does not match the location', () => {
    const result = hideOrShowLocation('Dayton', 'Memphis', true);
    expect(result).to.equal('show');
  });
});
