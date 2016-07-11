import React, {PropTypes} from 'react';

import { on, ready as playerReady } from '../ipc/playerInterface';
import { Col, Row } from './layout';

import { firebaseForRoomId } from '../firebase';

import controllerProvider from './controllerProvider';

import {
	Card,
	CardTitle,
	CardMedia
} from 'material-ui';

import {
	AvPlayArrow
} from 'material-ui/svg-icons/';

const EmptyTrack = {
	name: "Ingenting :(",
	artistString: "Sett på noe da for helvette",
	imageUrl: "/images/worlds.jpg"
};

export default class PlayerView extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			track: EmptyTrack
		};
	}
	
	componentDidMount() {
		this.ref = firebaseForRoomId(this.context.roomId)
			.child("nowPlaying");
		
		this.ref.on("value", (snapshot) => {
			this.setTrack(snapshot.val);
		});
	}
	
	componentWillUnmount() {
		this.ref.off();
	}
	
	setTrack(track) {
		this.setState({ track });
	}
	
	getStreamUrl(uri) {
		return `/stream/${uri}`;
	}
	
	render() {
		let track = this.state.track;
		
		return (
			<div className="player" >
				<div className="player-image-container">
					<div
						className="player-play-button"
						onTouchTap={() => this.co.controller.resume()}>
							<AvPlayArrow
								color="white"
								style={{
									margin: 0,
									width: 70,
									height: 70
								}}
								 />
					</div>
					<img src={track.imageUrl} className="player-image" />
				</div>
				
				<div className="player-info cardish">
					<span className="player-info-name">{track.name}</span>
					<span className="player-info-artist">{track.artistString}</span>
				</div>
			</div>
		);
	}
}

PlayerView.contextTypes = {
	roomId: PropTypes.string,
	controller: PropTypes.object
};

PlayerView.propTypes = {
};
