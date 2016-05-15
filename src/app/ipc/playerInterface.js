import { ipcRenderer } from 'electron';

export function pause() {
	ipcRenderer.send("player:pause");
}

export function resume() {
	ipcRenderer.send("player:resume");
}

export function play(uri) {
	ipcRenderer.send("player:play", uri);
}

export function on(channel, fn) {
	return ipcRenderer.on("player:" + channel, fn);
}
