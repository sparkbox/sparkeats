const supertest = require('supertest');

describe('Places', () => {
  describe('homepage', () => {
    it('returns 200 OK', done => {
      supertest(sails.hooks.http.app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('new place page (unauthenticated)', () => {
    it('returns 401 Unauthorized', done => {
      supertest(sails.hooks.http.app)
        .get('/places/new')
        .expect(401, done);
    });
  });

  describe('new place page (authenticated)', () => {
    it('returns 200 OK', done => {
      supertest(sails.hooks.http.app)
        .get('/places/new')
        .auth('test', 'test')
        .expect(200, done);
    });
  });

  describe('creating a new place', () => {
    it('returns 302 Found', done => {
      const newPlace = {
        placeName: 'a new place',
        city: 'a new city',
        state: 'SD',
        address: '7140 Manchester St.',
        phone: '(555) 555-5555',
        placeURL: 'https://www.anewplace.com',
      };

      supertest(sails.hooks.http.app)
        .post('/places')
        .send(newPlace)
        .expect(302, done);
    });
  });
});
