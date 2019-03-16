var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src/main/js'),
  entry: [
    '@babel/polyfill',
    './index.js'
  ],
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: __dirname,
    filename: './src/main/webapp/js/app.bundle.js'
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
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-throw-expressions'
            ]
          }
        }
      }, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }, {
        test: /\.gif$/,
        loader: 'url-loader'
      }, {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader'
      },
    ]
  }, plugins: [
    new ExtractTextPlugin({
      filename: './src/main/webapp/css/app.bundle.css',
    }),
  ]
};