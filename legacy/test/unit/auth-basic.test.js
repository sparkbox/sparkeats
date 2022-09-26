const { expect } = require('chai');
const { isValid } = require('../../api/services/auth-basic');

describe('Basic Authentication', () => {
  before(() => {
    process.env.AUTH_USERNAME = 'sample';
    process.env.AUTH_PASSWORD = 'sample';
  });

  after(() => {
    process.env.AUTH_USERNAME = undefined;
    process.env.AUTH_PASSWORD = undefined;
  });

  it('validates username and password', () => {
    const result = isValid('sample', 'sample');
    expect(result).to.equal(true);
  });

  it('returns false for incorrect credential', () => {
    const result = isValid('wrong', 'credentials');
    expect(result).to.equal(false);
  });
});
