
import * as player from "../ipc/playerInterface";

export default class SpotifyController {
	constructor() {
		// Ensure correct `this` in callback
		this._statusCallback = (status) => this.statusChanged(status);
		
		this.listen();
	}
	
	listen() {
		player.on("status", this._statusCallback);
	}
	
	unlisten() {
		player.off("status", this._statusCallback);
	}
	
	statusChanged(status) {
		console.dir(status);
		
		
	}
}