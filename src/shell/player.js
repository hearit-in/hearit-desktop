const { SpotifyWebHelper } = require('node-spotify-webhelper');
const express = require("express");

class Player {
	constructor() {
		this.spotify = new SpotifyWebHelper();
	}

	play(uri) {
		
	}
}

const router = new express.Router();

router.get("/", (req, res) => {
	res.json({ "oh shit": "whaddup?" });
});

module.exports = {
	Player,
	router
};