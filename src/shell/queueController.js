"use strict";

const _ = require("lodash");
const firebase = require("./firebase");
const { ServerValue } = reuquire("firebase");

const { Map, List, fromJS } = require("immutable");

const { SpotifyWebHelper } = require("node-spotify-webhelper");

const queueRef = firebase("rooms/dank/queue");
const ipc = require("electron").ipcMain;
const router = exports.router = express.Router();
const _fetch = require("isomorphic-fetch");

function fetch(uri, options) {
	return _fetch(uri, {
		...options,
		headers: Object.assign({}, {
			"Origin": "https://open.spotify.com"
		}, options.headers)
	})
}

function sortQueueByVotes(a, b) {
	let votesA = a.get("votes", new Map()).size;
	let votesB = b.get("votes", new Map()).size;

	if(votesA > votesB) return -1;
	if(votesB > votesA) return 1;

	let timeA = a.get("queuedAt", 0);
	let timeB = b.get("queuedAt", 0);

	if(timeB > timeA) return -1;
	if(timeA > timeB) return 1;

	return 0;
}

function QueueController(roomId) {
	this.spotify = new SpotifyWebHelper();
	this.roomRef = firebase("rooms/dank")
	this.ref = this.roomRef.child("queue");
	this.nowPlayingRef = this.roomRef.child("nowPlaying");
	this.queue = new List();
	this._isListening = false;
	
	this._ipcEvents = {
		"player:ready": () => {
			
		},
		"player:play": (param) => {
			this.nowPlayingRef.set({})
		}
	};
	
}

QueueController.prototype.

QueueController.prototype.start = function() {
	this._listen();
}

QueueController.prototype._waitForStatusUpdate = function() {
	this.spotify.getStatus((err, res) => {
		if(!this._isListening) {
			return;
		}
		
		if(err !== undefined) {
			
		}
		
		setTimeout(() => this._waitForStatusUpdate(), this.statusUpdateInterval);
	});
}

QueueController.prototype._handleStatusUpdate = function(status) {
	console.log(status);
	ipc.send("player:status", status);
}

QueueController.prototype._queueChanged = function(snapshot) {
	if(!snap.exists()) {
		this.queue = new List();
		return;
	}
	
	this.queue = toJS(snapshot.val())
		.sort(sortQueueByVotes)
		.valueSeq();
}

QueueController.prototype._listen = function() {
	this.ref.on("value", snap => this._queueChanged(snap));
	this._waitForStatusUpdate();
	
	this._ipcEvents.forEach((fn, channel) => ipc.on(channel, fn));
	
	this._isListening = true;
}

QueueController.prototype._unlisten = function() {
	this.ref.off();
	this._ipcEvents.forEach((fn, channel) => ipc.removeListener(channel, fn));
	this._isListening = false;
}

QueueController.prototype.playNext = function() {
	if(this.queue.size() == 0) {
		return;
	}
	let track = this.queue.get(0);
	
	this.ref.child(track.get("id")).remove();
	
	let historyTrack = track.set("playedAt", Firebase)
	this.ref.child("history").child;
}

QueueController.prototype.play = function() {
	this.spotify.play(uri);
}

QueueController.prototype.pause = function() {
	this.spotify.pause();
};

QueueController.prototype.resume = function() {
	this.spotify.unpause();
}