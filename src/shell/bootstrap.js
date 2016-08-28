'use strict';
const electron = require('electron');
const app = electron.app;

console.log(process.env.NODE_ENV);
// adds debug features like hotkeys for triggering dev tools and reload
if(process.env.NODE_ENV == "debug")
	require('electron-debug')();

const Player = require("./player");
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
		title: "Hearit Player",
		width: 850,
		height: 460,
		autoHideMenuBar: true,
		titleBarStyle: "hidden-inset",
		show: true
	});

	let player = new Player(win.webContents);
	player.listen();

	win.on('ready-to-show', () => { win.show() });


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
