const { expect } = require('chai');
const { isValid } = require('../../api/services/auth-basic');

describe('Authenticate', () => {
  const authUserName = process.env.AUTH_USERNAME;
  const authPassword = process.env.AUTH_PASSWORD;

  before(() => {
    process.env.AUTH_USERNAME = 'sample';
    process.env.AUTH_PASSWORD = 'sample';
  });

  after(() => {
    process.env.AUTH_USERNAME = authUserName;
    process.env.AUTH_PASSWORD = authPassword;
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
