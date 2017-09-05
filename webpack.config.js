var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
				test: /\.json?$/,
				loader: 'json-loader'
			}, 
			{
      test: /\.css$/,
      loaders: ["style-loader","css-loader"],
      include: /flexboxgrid/
			}, {
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				exclude: /flexboxgrid/
			},{
      test: /\.(png|jpeg|ttf|jpg)$/,
      loader: 'url-loader',
      exclude: /flexboxgrid/
    }
		]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

module.exports = config;
