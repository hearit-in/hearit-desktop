'use strict';
const electron = require('electron');
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

const player = require("./player");
const server = require("./server");
const config = require("./cfg");

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 850,
		height: 460,
		autoHideMenuBar: true,
		titleBarStyle: "hidden-inset"
	});
	
	server.listen(config.serverPort, () => {
		win.loadURL(`http://${config.serverHost}:${config.serverPort}/`);
	});
	
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
