const MySQLWritableStream = require('./MySQLWritableStream');

class SkipperMySQLAdapter {
  constructor(options = {}) {
    this.options = options;
  }

  receive(options = {}) {
    return new MySQLWritableStream(options, this);
  }
}

module.exports = options => new SkipperMySQLAdapter(options);
