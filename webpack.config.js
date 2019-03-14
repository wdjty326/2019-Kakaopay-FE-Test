var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src/main/js'),
  entry: {
    app: './index.js',
  },
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: __dirname,
    filename: './src/main/webapp/js/[name].bundle.js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }
    ]
  }, plugins: [
    new ExtractTextPlugin({
      filename: './src/main/webapp/css/app.bundle.css',
    }),
  ]
};