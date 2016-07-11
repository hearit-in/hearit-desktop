const ipc = window.require('electron').ipcRenderer;

export function pause() {
	ipc.send("player:pause");
}

export function resume() {
	ipc.send("player:resume");
}

export function play(uri) {
	ipc.send("player:play", uri);
}

export function ready() {
	ipc.send("player:ready");
}

export function loginSpotify(username, password) {
	ipc.send("player:loginSpotify", username, password);
}

export function beginFacebookAuthFlow(uid, token) {
	ipc.send("player:beginFacebookAuthFlow");
}

export function on(channel, fn) {
	return ipc.on("player:" + channel, fn);
}

export function off(channel, fn) {
	return ipc.removeListener("player:" + channel, fn);
}

export function once(channel, fn) {
	return ipc.once("player:" + channel, fn);
}