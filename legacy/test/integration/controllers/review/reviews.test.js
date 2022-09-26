const supertest = require('supertest');

describe('ReviewController', () => {
  describe('GET /places/:id', () => {
    xit('renders /pages/reviews/reviews', done => {
      supertest(sails.hooks.http.app)
        .get('/places/1')
        .expect(200, done);
    });
  });

  describe('GET /places/:id/reviews/new (unauthenticated)', () => {
    it('returns 401 Unauthorized without auth', done => {
      supertest(sails.hooks.http.app)
        .get('/places/:id/reviews/new')
        .expect(401, done);
    });
  });

  describe('GET /places/:id/reviews/new (authenticated)', () => {
    xit('renders pages/reviews/new', done => {
      supertest(sails.hooks.http.app)
        .get('/places/1/reviews/new')
        .auth('test', 'test')
        .expect(200, done);
    });
  });

  describe('POST /places/:id/reviews', () => {
    it('creates a new review', done => {
      const newReview = {
        reviewText: 'a new review',
        reviewerName: 'John Doe',
        numberOfStars: 5,
        placeId: 1,
      };

      supertest(sails.hooks.http.app)
        .post('/places/1/reviews')
        .send(newReview)
        .expect(302, done);
    });
  });
});
