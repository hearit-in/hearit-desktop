import React, {PropTypes} from 'react';

import {
	Card,
	CardText,
	CardActions,
	TextField,
	FlatButton
} from 'material-ui';
	
import { Col, Row } from './layout';

class SelectRoomView extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			roomId: ""
		}
	}
	
	loginButtonClicked() {
		this.context.router.push("/player");
	}
	
	render() {
		return (
			<Row className="top-margin">
				<Col md={6} mdPush={3}>
					<Card>
						<CardText>
							<TextField
								value={this.state.roomId}
								onChange={e => this.setState({ roomId: e.target.value })}
								fullWidth
								floatingLabelText="Rom-navn" />
						</CardText>
						<CardActions>
							<FlatButton label="Logg inn" primary fullWidth={true} onClick={() => this.loginButtonClicked()} />
						</CardActions>
					</Card>
				</Col>
			</Row>
		);
	}
}

SelectRoomView.propTypes = {
};

SelectRoomView.contextTypes = {
	router: PropTypes.object
}

export default SelectRoomView;