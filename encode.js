const fs = require('fs');

function encode(filePath) {
  const bitmap = fs.readFileSync(filePath);
  return bitmap.toString('base64');
}

module.exports = encode;
