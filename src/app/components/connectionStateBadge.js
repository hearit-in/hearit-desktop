import React, {PropTypes} from 'react';

import * as player from '../ipc/playerInterface';

export default class PlayerStateBadge extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			online: false
		};
	}
	
	componentDidMount() {
		player.on("status", (event, response) => {
			var online =
				   response.err == undefined
				&& response.status != undefined
				&& response.status.online;
			
			this.setIsOnline(online);
		});
		
		player.requestStatus();
	}
	
	setIsOnline(online) {
		this.setState({ online });
	}
	
	componentWillUnmount() {
		
	}
	
	get labelText() {
		return this.state.online ? "SPOTIFY TILKOBLET" : "KAN IKKE KOBLE TIL SPOTIFY";
	}
	
	get labelStyle() {
		return {
			color: this.state.online ? "#27ae60" : "#c0392b",
			fontSize: "12px"
		};
	}
	
	render() {
		return (<span style={this.labelStyle}>{this.labelText}</span>);
	}
}

PlayerStateBadge.propTypes = {
};
