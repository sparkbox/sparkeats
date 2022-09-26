const fs = require('fs');

function encode(image, dir) {
  if (!image) {
    return '';
  }

  const filePath = `./data/images/${dir}/${image}`;
  const bitmap = fs.readFileSync(filePath);

  return bitmap.toString('base64');
}

module.exports = encode;
