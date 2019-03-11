const sails = require('sails');

before(function setup(done) {
  process.env.NODE_ENV = 'test';

  this.timeout(5000);

  sails.lift(
    {
      hooks: { grunt: false },
      log: { level: 'warn' },
    },
    err => {
      if (err) {
        return done(err);
      }

      return done();
    }
  );
});

after(done => {
  sails.lower(done);
});
