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
	name: "Ingenting :(",
	artistString: "Sett på noe da for helvette",
	images: [
		{ url: "/images/worlds.jpg" },
		{ url: "/images/worlds.jpg" },
		{ url: "/images/worlds.jpg" }
	]
};

export default class PlayerView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			track: EmptyTrack,
			shouldPlay: false
		};
	}

	componentDidMount() {
		this.ref = firebaseForRoomId(this.context.roomId)
			.child("nowPlaying");

		this.queueController = new QueueController(this.context.roomId);
		this.queueController.listen();

		this.ref.on("value", (snapshot) => {
			this.setTrack(snapshot.val());
		});
	}

	componentWillUnmount() {
		this.ref.off();
		this.queueController.unlisten();
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
					<div className="player-image-container">
						<img src={track.images[0].url} className="player-image" />
					</div>

					<div className="player-info cardish">
						<span className="player-info-name">{track.name}</span>
						<span className="player-info-artist">{track.artistString}</span>
					</div>
					<div className="cardish-white player-play-button" onClick={() => this.toggleShouldPlay()}>
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
	controller: PropTypes.object
};

PlayerView.propTypes = {
};
