import Firebase from 'firebase';

const BASE_URL = "https://crowdplayspace.firebaseio.com";

export function createFirebase(node) {
	node = node || "/";
	return new Firebase(BASE_URL + (node[0] == "/" ? "" : "/") + node);
}

export function firebaseForRoom(roomId) {
	return createFirebase(`/rooms/${roomId}`);
}
