import React, {PropTypes} from 'react';

import {
	Card,
	CardActions,
	TextField,
	FlatButton
} from 'material-ui';

export default class SpotifyLoginView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<TextField placeholderText="Spotify-brukernavn" />
				<TextField placeholderText="Passord" />
				<CardActions>
					<FlatButton label="Logg inn med Spotify" />
				</CardActions>
			</Card>
		);
	}
}

SpotifyLoginView.propTypes = {
};
