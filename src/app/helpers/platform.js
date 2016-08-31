
function platform() {
	if(navigator.appVersion.indexOf("Mac") !== -1) return "osx";
	if(navigator.appVersion.indexOf("Win") !== -1) return "windows";
	return "other";
}

export default platform();