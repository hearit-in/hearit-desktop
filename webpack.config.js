"use strict";

var webpack = require("webpack");
var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");

var isProduction = process.env.npm_lifecycle_event == "build";
var isDevelopment = !isProduction;

var config = {
	entry: "./src/app/entry.js",
	output: {
		filename: path.join(__dirname, "dist", "app", "bundle.js")
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
				from: "./src/app/static",
				to: "dist/app"
			},
			{
				from: "./src/index.js",
				to: "dist/index.js"
			},
			{
				from: "./package.json",
				to: "dist/package.json"
			},
			{
				from: "./src/shell",
				to: "./dist/shell"
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
