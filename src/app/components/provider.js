import React, {PropTypes} from 'react';

export default (key) => {
	class Provider extends React.Component {
		getChildContext() {
			return {
				[key]: this.props[key]
			}
		}
		
		render() {
			return this.props.children;
		}
	}
		
	Provider.childContextTypes = {
		[key]: PropTypes.any
	};
	
	return Provider;
}