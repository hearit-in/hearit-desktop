"use strict";

// Disclaimer: This is REALLY bad code.
// Basically, we have two shared mutable states to keep in sync, all while (hopefully) not interruptig the music

const _ = require("lodash");

const { Map, List, fromJS } = require("immutable");
const _fetch = require("isomorphic-fetch");

const { firebaseForRoomId } = require(".");

import * as player from "../ipc/playerInterface";

import Firebase from 'firebase';

function compareQueueEntriesByVotes(a, b) {
	let pinnedA = a.get("pinned", false);
	let pinnedB = b.get("pinned", false);

	if(pinnedA && !pinnedB) return -1;
	if(pinnedB && !pinnedA) return 1;

	let votesA = a.get("votes", new Map()).size;
	let votesB = b.get("votes", new Map()).size;

	if(votesA > votesB) return -1;
	if(votesB > votesA) return 1;

	let timeA = a.get("queuedAt", 0);
	let timeB = b.get("queuedAt", 0);

	if(timeB > timeA) return -1;
	if(timeA > timeB) return 1;

	return 0;
}

export default class QueueController {
	constructor(roomId) {
		this.roomRef = firebaseForRoomId(roomId);

		this.queueRef = this.roomRef.child("queue");
		this.historyRef = this.roomRef.child("history");
		this.nowPlayingRef = this.roomRef.child("nowPlaying");
		this.shouldPlay = true;
		this.nowPlaying = undefined;

		this.queue = new List();

		this.isListening = false;
		this.numberOfStatusesToIgnore = 0;
	}

	setShouldPlay(shouldPlay) {
		this.shouldPlay = shouldPlay;

		if(shouldPlay) player.resume();
		else player.pause();
	}

	queueChanged(snapshot) {
		if(!snapshot.exists()) {
			this.queue = new List();
			return;
		}

		this.queue = fromJS(snapshot.val())
			.valueSeq()
			.sort(compareQueueEntriesByVotes);
	}

	listen() {
		this.queueRef.on("value", (snapshot) => this.queueChanged(snapshot));
		this.nowPlayingRef.on("value", (snapshot) => {
			if(snapshot.exists()) {
				this.nowPlaying = snapshot.val();
				this.play(this.nowPlaying.providerId);
			}
			else {
				this.nowPlaying = undefined;
			}
		});

		this.isListening = true;
		this.requestStatus();
	}

	get hasNowPlaying() {
		return this.nowPlaying !== undefined;
	}

	doesCurrentTrackHaveId(id) {
		if(!this.hasNowPlaying) {
			return false;
		}
		return this.nowPlaying.providerId == id;
	}

	unlisten() {
		this.queueRef.off();
		this.isListening = false;
	}
	
	handleStatusResponse(response) {
		let {err, status} = response;
		
		if(!status) {
			if(err) throw err;
			else throw new Error("Server responded with neither status nor error");
		}
		else if(status.track && status.track.track_resource) {
			var trackId = status.track.track_resource.uri.split(":")[2];
			var position = status.playing_position;
		}
		else {
			throw new Error("Invalid status: missing track");
		}
		
		var isCurrentTrackNowPlaying = this.doesCurrentTrackHaveId(trackId);

		if(this.shouldPlay && !this.hasNowPlaying) {
			this.playNext();
		}
		else if(status.playing) {
			if(this.shouldPlay && !isCurrentTrackNowPlaying && this.hasNowPlaying) {
				this.play(this.nowPlaying.providerId);
			}
			else if(!this.shouldPlay) {
				player.pause();
			}
		}
		else if(!status.playing && this.shouldPlay) {
			//console.log({ position, isCurrentTrackNowPlaying, now: this.nowPlaying });
			if(isCurrentTrackNowPlaying && (position === 0)) {
				this.playNext();
			}
			else if(!isCurrentTrackNowPlaying && (position !== 0)) {
				this.play(this.nowPlaying.providerId);
			}
			else {
				player.resume();
			}
		}
	}

	requestStatus() {
		player.requestStatus()
			.then((response) => {
				if(this.isListening) {
					setTimeout(() => this.requestStatus(), 500);
				}
				
				// TODO: Refactor this mess
				if(this.numberOfStatusesToIgnore > 0) {
					this.numberOfStatusesToIgnore--;
				}
				else {
					this.handleStatusResponse(response);
				}
			})
			.catch(err => {
				console.error(err);
			})
	}

	/**
	 * Pops the next track off the queue, adds it to the history, and sets it as "now playing"
	 */
	playNext() {
		this.shouldPlay = true;

		console.log(this.queue);
		if(this.queue.size === 0) {
			// TODO: Handle empty queue
			return;
		}

		let track = this.queue.get(0);
		this.queueRef.child(track.get("id")).remove();
		let historyTrackJS = track.toJS();

		historyTrackJS.playedAt = Firebase.database.ServerValue.TIMESTAMP;

		this.historyRef
			.child(track.get("id"))
			.set(historyTrackJS);
			
		console.log(historyTrackJS);

		this.nowPlayingRef.set(historyTrackJS);
	}
	
	ignoreNextStatus(n) {
		this.numberOfStatusesToIgnore += (n || 1);
	}

	play(spotifyId) {
		player.play("spotify:track:" + spotifyId);
		this.ignoreNextStatus(2);
	}

}
