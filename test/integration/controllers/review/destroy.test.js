const supertest = require('supertest');
const { expect } = require('chai');

describe('ReviewController.destroy', () => {
  context('when a place has 2 or more reviews', () => {
    it.only('deletes the specified review', async done => {
      const beforeCount = await Review.count();
      const afterCount = beforeCount - 1;

      supertest(sails.hooks.http.app)
        .delete('/places/1/reviews/2')
        .expect('Content-Type', /text\/plain/)
        .expect(302)
        .then(async res => {
          expect(await Review.count()).to.equal(afterCount);
          done();
        })
        .catch(done);
    });

    xit('destroys the correct review', () => {});
  });
});
