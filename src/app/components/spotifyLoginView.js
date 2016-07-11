import React, {PropTypes} from 'react';

import {
	Card,
	CardText,
	CardActions,
	TextField,
	FlatButton
} from 'material-ui';

import HorizontalRulerText from './horizontalRulerText';
import FacebookLoginButton from './facebookLoginButton';
import SpotifyLoginButton from './spotifyLoginButton';

import color from 'material-ui/styles/colors';

import { Row, Col } from './layout';

import { loginSpotify } from '../ipc/playerInterface';

export default class SpotifyLoginView extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: "sebbern001",
			password: "hare97op"
		}
	}

	handleSpotifyLogin() {
		loginSpotify(this.state.username, this.state.password);
	}

	render() {
		return (
			<Row className="top-margin">
				<Col md={6} mdPush={3}>
					<Card>
						<CardText>
							<Row>
								<Col md={12}>
									<TextField
										id="usernameField"
										floatingLabelText="Spotify-brukernavn"
										value={this.state.username}
										onChange={(e) => this.setState({ username: e.target.value })}
										fullWidth />
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<TextField
										id="passwordField"
										floatingLabelText="Passord"
										value={this.state.password}
										onChange={(e) => this.setState({ password: e.target.value })}
										type="password"
										fullWidth />
								</Col>
							</Row>
						</CardText>
						<CardActions>
							<SpotifyLoginButton
								onClick={() => this.handleSpotifyLogin()}
								style={{
									marginLeft: "auto",
									marginRight: "auto",
									display: "block"
								}} />
						</CardActions>
						<CardText>
							<Row>
								<Col md={10} mdPush={1}>
									<HorizontalRulerText text="ELLER" />
								</Col>
							</Row>
							<Row>
								<Col md={10} mdPush={1}>
									<span style={{
										color: "#bbb",
										fontSize: "0.9em"
									}}>
										Logg inn med facebook for å slippe å logge inn på nytt hver gang
									</span>
								</Col>
							</Row>
						</CardText>
						<CardActions>
							<FacebookLoginButton
								disabled
								style={{
									marginLeft: "auto",
									marginRight: "auto",
									display: "block"
								}} />
						</CardActions>
					</Card>
				</Col>
			</Row>
		);
	}
}

SpotifyLoginView.propTypes = {
};
