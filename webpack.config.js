"use strict";

var webpack = require("webpack");
var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");

module.exports = {
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
				from: "./src/shell",
				to: "./dist/shell"
			}
		])
	]
};
