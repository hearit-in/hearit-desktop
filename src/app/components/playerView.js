import React, {PropTypes} from 'react';

import { on, ready as playerReady } from '../ipc/playerInterface';
import { Col, Row } from './layout';

import { firebaseForRoomId } from '../firebase';

import controllerProvider from './controllerProvider';

import QueueController from '../firebase/queueController';

import {
	Card,
	CardTitle,
	CardMedia
} from 'material-ui';

import {
	AvPlayArrow,
	AvPause
} from 'material-ui/svg-icons/';

const EmptyTrack = {
	name: "Har ikke noe å spille",
	artist: "Sett på noe da for helvette",
	album: "latterlig lite",
	images: {
		small: "/images/thumbs-down.gif",
		medium: "/images/thumbs-down.gif",
		large: "/images/thumbs-down.gif"
	}
};

export default class PlayerView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			track: EmptyTrack,
			shouldPlay: true
		};
	}

	componentDidMount() {
		let {roomId} = this.context;
		
		this.ref = firebaseForRoomId(roomId)
			.child("nowPlaying");

		this.queueController = new QueueController(roomId);
		this.queueController.listen();

		this.ref.on("value", (snapshot) => {
			this.setTrack(snapshot.val());
		});
	}

	componentWillUnmount() {
		this.ref.off();
		this.queueController.unlisten();
		delete this.queueController;
	}

	setTrack(track) {
		this.setState({ track });
	}

	getStreamUrl(uri) {
		return `/stream/${uri}`;
	}

	setShouldPlay(shouldPlay) {
		this.setState({ shouldPlay });
		this.queueController.setShouldPlay(shouldPlay);
	}

	toggleShouldPlay() {
		this.setShouldPlay(!this.state.shouldPlay);
	}

	render() {
		let track = this.state.track;

		let iconStyle = {
			width: 40,
			height: 40,
			display: "block",
			margin: "0px auto"
		};

		return (
			<div className="player-container">
				<div className="player" >
					<img src={track.images.large} className="player-image" />

					<div className="player-right">
						<div className="player-info">
							<span className="player-info-name">{track.name}</span>
							<span className="player-info-artist">{track.artist}</span>
						</div>
					</div>
				</div>
				
				<div className="player-play-button" onClick={() => this.toggleShouldPlay()}>
					<iconClass className="player-play-button-icon"  />
					{ this.state.shouldPlay
						? <AvPause style={iconStyle} />
						: <AvPlayArrow style={iconStyle} />
					}
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
