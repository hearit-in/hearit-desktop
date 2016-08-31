"use strict";

const _ = require("lodash");
const { ServerValue } = require("firebase");

const { Map, List, fromJS } = require("immutable");

const { SpotifyWebHelper } = require("node-spotify-webhelper");

const ipc = require("electron").ipcMain;
const _fetch = require("isomorphic-fetch");

function fetch(uri, options) {
	return _fetch(uri, Object.assign({}, {
		headers: Object.assign({}, {
			"Origin": "https://open.spotify.com"
		}, options.headers)
	}, options))
}

function normalizeSpotifyStatus(err, status) {
	let trackName = status.track_resource.name;
	let spotifyId = status.track_resource.uri.replace("spotify:track:", "");
};

/**
 * Exposes an interface via IPC to control spotify.
 * Big dumb stateful imperative object right here
 */
class Player {
	constructor(webContents) {
		this.webContents = webContents;
		this.spotify = new SpotifyWebHelper();
		this.spotify.init();
		this.statusUpdateInterval = 500;
		this.isListening = false;
		
		this._ipcEvents = {
			"player:pause": () => this.pause(),
			"player:resume": () => this.resume(),
			"player:play": (event, trackId) => this.play(trackId),
			"player:requestStatus": (event) => this.requestStatus(event).then()
		};
	}
	
	listen() {
		_.forEach(this._ipcEvents, (fn, channel) => ipc.on(channel, fn));
		
		this.isListening = true;
		//this.pollStatus();
	}

	unlisten() {
		_.forEach(this._ipcEvents, (fn, channel) => ipc.removeListener(channel, fn));
		
		this.isListening = false;
	}
	
	pollStatus() {
		var fn = () => this.requestStatus()
			.then(status => {
				console.log(status);
				return status;
			}, (err) => {
				console.error(err);
			})
			.then(() => {
				if(this.isListening)
					setTimeout(fn);
			});
		
		fn();
	}
	
	requestStatus() {
		console.log("Status was requested");
		return new Promise((resolve, reject) => {
			this.spotify.getStatus((err, status) => {
				
				console.log("Got status:");
				console.dir(status, err);
				
				this.webContents.send("player:status", {status, err});
				
				if(err === undefined) {
					resolve(status);
				}
				else {
					reject(err);
				}
			});
		});
	}
	
	play(uri) {
		this.spotify.play(uri);
	}
	
	pause() {
		this.spotify.pause();
	}
	
	resume() {
		this.spotify.unpause();
	}
}

module.exports = Player;