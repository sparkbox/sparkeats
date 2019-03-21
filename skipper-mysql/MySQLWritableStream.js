const { Writable } = require('stream');

class MySQLWritableStream extends Writable {
  constructor(options, adapter) {
    super((options = { objectMode: true }));
    this.adapter = adapter;
  }

  _write(readable, encoding, cb) {
    const chunks = [];

    readable.on('data', chunk => {
      chunks.push(chunk);
    });

    readable.on('end', () => {
      const data = Buffer.concat(chunks);
      const bytes = data.toString('base64').length * 0.75 - 2;

      if (bytes > 5000000) {
        return cb(new Error('image-too-big'));
      }

      return this.adapter.options.model
        .create({
          file: data.toString('base64'),
          fd: readable.fd,
        })
        .then(cb)
        .catch(err => {
          cb(err);
        });
    });
  }
}

module.exports = MySQLWritableStream;
