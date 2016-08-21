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
			roomId: "dank"
		};
	}
	
	getChildContext() {
		return {
			roomId: this.state.roomId
		}
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
			<Router history={browserHistory}>
				<Route path="/" component={MainView}>
					<IndexRoute component={SelectRoomView} />
					<Route path="/player" component={PlayerView} />
				</Route>
			</Router>
		);
	}
}

App.childContextTypes = {
	roomId: PropTypes.string
}

App.propTypes = {
};
