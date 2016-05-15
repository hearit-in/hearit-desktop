import React, {PropTypes} from 'react';
import {
	AppBar
} from 'material-ui';

import Track from './track';
import ThemeProvider from './themeProvider';
import SpotifyLoginView from './spotifyLoginView';

import { fromJS } from 'immutable';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<ThemeProvider>
				<div>
					<AppBar
						title="hearit.in" />

					<SpotifyLoginView />

					<Track track={fromJS({
						name: "Dirty Harry",
						artistString: "Gorillaz"
					})} />
				</div>
			</ThemeProvider>
		</div>
	}
}

App.propTypes = {
};
