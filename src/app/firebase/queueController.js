"use strict";

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
				this.play(snapshot.val().providerId);
			}
		});
		
		this.isListening = true;
		this.requestStatus();
	}
	
	doesCurrentTrackHaveId(id) {
		return this.nowPlaying.providerId == id;
	}
	
	unlisten() {
		this.queueRef.off();
		this.isListening = false;
	}
	
	requestStatus() {
		player.requestStatus()
		.then((response) => {
			console.dir(response);
			let {err, status} = response;
			
			if((!status.playing) && this.doesCurrentTrackHaveId)
			
			if((!status.playing) && this.shouldPlay) {
				var trackId = status.track.track_resource.uri.split(":")[2];
				var position = status.playing_position;
				
				if(!this.doesCurrentTrackHaveId(trackId) || position == 0) {
					this.playNext();
				}
				else {
					player.resume();
				}
			}
			else if(status.playing && !this.shouldPlay) {
				player.pause();
			}
			
			if(this.isListening) {
				setTimeout(() => this.requestStatus(), 1000);
			}
		})
	}
	
	/**
	 * Pops the next track off the queue, adds it to the history, and sets it as "now playing"
	 */
	playNext() {
		this.shouldPlay = true;
		
		if(this.queue.size === 0) {
			// TODO: Handle empty queue
			return;
		}
		
		let track = this.queue.get(0);
		this.queueRef.child(track.get("id")).remove();
		let historyTrack = track.set("playedAt", Firebase.database.ServerValue.TIMESTAMP);
		let historyTrackJS = historyTrack.toJS();
		
		this.historyRef
			.child(historyTrack.get("id"))
			.set(historyTrackJS);
		
		this.nowPlayingRef.set(historyTrackJS);
	}
	
	play(spotifyId) {
		player.play("spotify:track:" + spotifyId);
	}
	
}