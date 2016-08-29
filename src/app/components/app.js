import React, {PropTypes} from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainView from './mainView';
import SpotifyLoginView from './spotifyLoginView';
import SelectRoomView from './selectRoomView';
import PlayerView from './playerView';
import * as player from '../ipc/playerInterface';
import PlayerStateProvider from './playerStateProvider';
import {RoomIdProvider, OnRoomIdChangedProvider} from './roomIdProvider';


// Bootstrapping component
export default class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			roomId: "dank"
		};
	}
	
	componentDidMount() {
	}
	
	componentWillUnmount() {
	}
	
	setRoomId(roomId) {
		this.setState({ roomId });
	}
	
	render() {
		return (
			<RoomIdProvider roomId={this.state.roomId}>
				<OnRoomIdChangedProvider onRoomIdChanged={roomId => this.setRoomId(roomId)}>
				<Router history={browserHistory}>
					<Route path="/" component={MainView}>
						<IndexRoute component={SelectRoomView} />
						<Route path="/player" component={PlayerView} />
					</Route>
				</Router>
				</OnRoomIdChangedProvider>
			</RoomIdProvider>
		);
	}
}

App.childContextTypes = {
	roomId: PropTypes.string
}

App.propTypes = {
};
