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
				&& response != undefined
				&& response.online;
			
			this.setIsOnline(online);
		});
	}
	
	setIsOnline(online) {
		this.setState({ online });
	}
	
	componentWillUnmount() {
		
	}
	
	get labelText() {
		return this.state.online ? "online" : "offline";
	}
	
	get labelStyle() {
		return {
			color: this.state.online ? "#0f0" : "#f00"
		};
	}
	
	render() {
		return (<span style={this.labelStyle}>{this.labelText}</span>);
	}
}

PlayerStateBadge.propTypes = {
};
