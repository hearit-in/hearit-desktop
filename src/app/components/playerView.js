import React, {PropTypes} from 'react';

import { on, ready as playerReady } from '../ipc/playerInterface';
import { Col, Row } from './layout';
import { firebaseForRoomId } from '../firebase';
import controllerProvider from './controllerProvider';
import QueueController from '../firebase/queueController';
import * as player from '../ipc/playerInterface';

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

function DisableRepeatWarning(props) {
	return <div
		className="repeat-warning"
		style={{
			opacity: props.show ? 1 : 0,
			pointerEvents: props.show ? "auto" : "none"
		}}>
	</div>
}

export default class PlayerView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			track: EmptyTrack,
			playerStatus: undefined,
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
		
		this.onPlayerStatus = player.on("status", (event, response) => {
			console.log(response);
			this.setState({ playerStatus: response.status });
		});
	}

	componentWillUnmount() {
		this.ref.off();
		
		this.queueController.unlisten();
		delete this.queueController;
		
		player.off("status", this.onPlayerStatus);
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
		
		let isOnRepeat = this.state.playerStatus && this.state.playerStatus.repeat;

		return (
			<div>
				<DisableRepeatWarning show={isOnRepeat} />
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
			</div>
		);
	}
}

PlayerView.contextTypes = {
	roomId: PropTypes.string,
	controller: PropTypes.object,
	playerState: PropTypes.object
};

PlayerView.propTypes = {
};
