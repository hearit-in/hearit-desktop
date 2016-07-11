import config from '../config';

require("firebase");

export const app = firebase.initializeApp({
	databaseURL: config.firebaseURL,
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	databaseURL: config.databaseURL,
	storageBucket: config.storageBucket
});

export const db = app.database();

export const createFirebase = (node) => db.ref(node || "/");

export const firebaseForRoomId = (roomId) => createFirebase(`rooms/${roomId}`);