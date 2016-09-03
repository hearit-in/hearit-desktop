"use strict";

var webpack = require("webpack");
var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");

var isProduction = process.env.NODE_ENV === "production";
var isDevelopment = !isProduction;

const outFolder = path.join(__dirname, "build");

var config = {
	entry: "./src/app/entry.js",
	output: {
		filename: path.join(outFolder, "app", "bundle.js")
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
				to: path.join(outFolder, "app")
			},
			{
				from: "./src/shell",
				to: path.join(outFolder, "shell")
			},
			{
				from: "./src/index.js",
				to: path.join(outFolder, "index.js")
			},
			{
				from: "./package.json",
				to: path.join(outFolder, "package.json")
			},
			{
				from: "./src/icon.icns",
				to: path.join(outFolder, "icon.icns")
			},
			{
				from: "./src/icon.ico",
				to: path.join(outFolder, "icon.ico")
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
