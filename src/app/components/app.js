import React, {PropTypes} from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainView from './mainView';
import SpotifyLoginView from './spotifyLoginView';
import SelectRoomView from './selectRoomView';
import PlayerView from './playerView';
import * as player from '../ipc/playerInterface';
import PlayerStateProvider from './playerStateProvider';


// Bootstrapping component
export default class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			roomId: "dank",
			playerState: undefined
		};
	}
	
	getChildContext() {
		return {
			roomId: this.state.roomId
		}
	}
	
	componentDidMount() {
		player.on("status", setPlayerState);
	}
	
	componentWillUnmount() {
		player.off("status", setPlayerState)
	}
	
	setPlayerState(playerState) {
		debugger;
		this.setState({ playerState });
	}
	
	setRoomId(roomId) {
		this.setState({ roomId });
	}
	
	render() {
		return (
			<PlayerStateProvider playerState={this.state.playerState}>
				<Router history={browserHistory}>
					<Route path="/" component={MainView}>
						<IndexRoute component={SelectRoomView} />
						<Route path="/player" component={PlayerView} />
					</Route>
				</Router>
			</PlayerStateProvider>
		);
	}
}

App.childContextTypes = {
	roomId: PropTypes.string
}

App.propTypes = {
};
