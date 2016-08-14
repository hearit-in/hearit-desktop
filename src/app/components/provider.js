import React, {PropTypes} from 'react';

export default (key, type) => {
	type = (type === undefined) ? PropTypes.any : type;
	
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
		[key]: type
	};
	
	return Provider;
}