const PATH = require('path');

module.exports = {
  entry: {
    functions: ['./src/index.js'],
  },
  mode: 'development',
  watch: false,
  devtool: 'source-map',
  output: {
    filename: 'example.bundle.js',
    path: PATH.resolve(__dirname, 'assets'),
  },
  optimization: {
    minimize: true,
  }
};
