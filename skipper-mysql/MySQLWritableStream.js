const toBlob = require('stream-to-blob');
const { Writable } = require('stream');

class MySQLWritableStream extends Writable {
  constructor(options, adapter) {
    super((options = { objectMode: true }));
    this.adapter = adapter;
  }

  _write(readable, encoding, cb) {
    let data;

    readable.on('data', chunk => {
      data = Buffer.concat([chunk]);
    });

    readable.on('end', () => {
      this.adapter.options.model
        .create({
          file: ab2str(data),
          imageId: this.adapter.options.imageId,
          // filename: readable.filename,
        })
        // .fetch()
        .then(record => {
          // console.log(record);
        })
        .catch(err => {
          cb(err);
        });
    });

    // let buffer = file._readableState.buffer.head;
    // let finalBuffer;
    // if (!file.byteCount) {
    //   file.byteCount = file._readableState.length;
    // }
    // while (buffer) {
    //   finalBuffer = Buffer.concat([buffer.data]);
    //   buffer = buffer.next;
    // }
    // console.log(typeof finalBuffer.toString());
    // (async () => {
    //   await this.adapter.options.model.create({
    //     file: finalBuffer.toString(),
    //   });
    // })();
    // this.adapter.options.model
    //   .create({
    //     file: finalBuffer.toString(),
    //   })
    //   .then(cb);
  }
}

module.exports = MySQLWritableStream;
