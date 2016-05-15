import React, {PropTypes} from 'react';

export default class Track extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				margin: "20px auto",
				textAlign: "center"
			}}>
				<div>
					<span style={{ fontSize: "2.2em", color: "#fff" }}>
						{ this.props.track.get("name") }
					</span>
				</div>
				<div>
					<span style={{ fontSize: "1.5em", color: "#eee" }}>
						{ this.props.track.get("artistString") }
					</span>
				</div>
			</div>
		);
	}
}

Track.propTypes = {
	track: PropTypes.object
};
