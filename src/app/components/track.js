import React, {PropTypes} from 'react';

const TrackTitle = (props) =>
	<span
		style={{
			fontSize: "2.2em"
		}}>
		{ props.title }
	</span>

export default class Track extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TrackTitle title="Test" />
			</div>
		);
	}
}

Track.propTypes = {
};
