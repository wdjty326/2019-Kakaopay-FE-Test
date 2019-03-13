var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src/main/js'),
  entry: {
    kakaoApp: './index.js',
  },
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: __dirname,
    filename: './src/main/webapp/js/react/[name].bundle.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      }, {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader']
      }
    ]
  }
};