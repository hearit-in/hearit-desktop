const express = require("express");
const playerRouter = require("./player").router;
const server = express();
const path = require("path");

server.use(express.static(path.join(__dirname, "..", "app")));

//server.use("/player", playerRouter);

server.use((req, res) => {
	res.sendFile(path.join(__dirname, "..", "app", "index.html"))
});

module.exports = server;