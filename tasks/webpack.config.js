const path = require('path');

module.exports = {
  entry: './source/js/index.js',
  output: {
    path: path.join(__dirname, '../public/assets/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
    ],
  },
};
