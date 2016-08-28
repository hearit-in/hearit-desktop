"use strict";

var webpack = require("webpack");
var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");

var isProduction = process.env.npm_lifecycle_event == "build";
var isDevelopment = !isProduction;

var config = {
	entry: "./src/app/entry.js",
	output: {
		filename: path.join(__dirname, "app", "app", "bundle.js")
	},
	devtool: "source-map",
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["es2015", "react"],
					cacheDirectory: ""

				}
			},
			{ test: /\.css$/,           loader: "style-loader!css-loader" },
			{ test: /\.(png|jpg|gif)$/, loader: "file-loader"}
		]
	},
	plugins: [
		new CopyPlugin([
			{
				from: "./src/app/static/",
				to: "./app/app/"
			},
			{
				from: "./src/index.js",
				to: "./app/index.js"
			},
			{
				from: "./src/shell",
				to: "./app/shell"
			},
			{
				from: "./src/icon.icns",
				to: "./app/icon.icns"
			}
		])
	]
};

if(isProduction) {
	config.plugins = config.plugins.concat([
	    new webpack.optimize.DedupePlugin(),
	    new webpack.DefinePlugin({
	        'process.env.NODE_ENV': '"production"'
	    }),
	    new webpack.optimize.UglifyJsPlugin(),
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.AggressiveMergingPlugin(),
	    new webpack.NoErrorsPlugin()
	]);
}


module.exports = config;
