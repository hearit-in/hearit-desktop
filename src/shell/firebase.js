const Firebase = require("firebase");
const BASE_URL = "https://crowdplayspace.firebaseio.com";

module.exports = (node) => new Firebase(BASE_URL + (node[0] == "/" ? "" : "/") + node);