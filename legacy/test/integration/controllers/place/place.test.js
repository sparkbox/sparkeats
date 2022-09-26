const supertest = require('supertest');

describe('PlaceController', () => {
  describe('GET /', () => {
    it('renders /pages/homepage', done => {
      supertest(sails.hooks.http.app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /places/ new (unauthenticated)', () => {
    it('returns 401 Unauthorized without auth', done => {
      supertest(sails.hooks.http.app)
        .get('/places/new')
        .expect(401, done);
    });
  });

  describe('GET /places/new (authenticated)', () => {
    it('renders /pages/places/new', done => {
      supertest(sails.hooks.http.app)
        .get('/places/new')
        .auth('test', 'test')
        .expect(200, done);
    });
  });

  describe('POST /places', () => {
    it('creates a new place', done => {
      const newPlace = {
        placeName: 'a new place',
        city: 'a new city',
        state: 'SD',
        address: '7140 Manchester St.',
        phone: '(555) 555-5555',
        placeURL: 'anewplace.com',
      };

      supertest(sails.hooks.http.app)
        .post('/places')
        .send(newPlace)
        .expect(302, done);
    });
  });
});
