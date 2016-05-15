"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: "./src/app/entry.js",
	output: {
		path: path.join(__dirname, "dist", "bundle.js")
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["es2015", "react"]
				}
			}
		]
	}
};
