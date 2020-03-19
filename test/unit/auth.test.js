const { expect } = require('chai');
const { validate } = require('../../api/services/auth-basic');

describe('Authenticate', () => {
  it.only('validates username and password', async () => {
    const username = process.env.AUTH_USERNAME;
    const password = process.env.AUTH_PASSWORD;
    const result = await validate(username, password);
    expect(result).to.equal(true);
  });
});
