const path = require('path');

module.exports = {
  entry: './src/index.jsx', // or your main TS file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 👈 now includes TypeScript
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // for CSS support
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 👈 resolve these
  },
  mode: 'development',
};


module.exports = {
  entry: './src/index.jsx', // or your main TS file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 👈 now includes TypeScript
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // for CSS support
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 👈 resolve these
  },
  mode: 'development',
};
