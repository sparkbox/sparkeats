const supertest = require('supertest');

describe('Reviews', () => {
  let newPlace;

  beforeEach(async () => {
    newPlace = await Place.findOne({ placeName: 'a new place' });
  });

  describe('place reviews page', () => {
    it('returns 200 OK', done => {
      const { id } = newPlace;

      supertest(sails.hooks.http.app)
        .get(`/places/${id}`)
        .expect(200, done);
    });
  });

  describe('new review page (unauthenticated)', () => {
    it('returns 401 Unauthorized', done => {
      supertest(sails.hooks.http.app)
        .get('/places/:id/reviews/new')
        .expect(401, done);
    });
  });

  describe('new review page (authenticated)', () => {
    it('returns 200 OK', done => {
      const { id } = newPlace;

      supertest(sails.hooks.http.app)
        .get(`/places/${id}/reviews/new`)
        .auth('test', 'test')
        .expect(200, done);
    });
  });

  describe('creating a new review', () => {
    it('returns 302 Found', done => {
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

  xit("doesn't upload an image greater than 5 MB", done => {
    const newReview = {
      reviewerName: 'John Doe',
      reviewText: 'a new review',
      // reviewImage: ,
      reviewImageAlt: '',
      numberOfStars: 5,
      placeId: 1,
    };

    supertest(sails.hooks.http.app)
      .post('/places/1/reviews')
      .field('reviewerName', 'John Doe')
      .field('reviewText', 'a new review')
      .field('numberOfStars', 5)
      .field('placeId', 1)
      .attach('file', 'data/images/reviews/basils-heather.png')
      .expect(302, done);
  });
});
