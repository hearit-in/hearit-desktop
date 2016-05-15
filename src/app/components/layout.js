import React, { PropTypes } from 'react';

function MergeClassNames(baseClassName) {
	return (ComposedComponent) => class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				className: this.getClassName(props.className)
			};
		}

		getClassName(className) {
			return `${baseClassName || ""} ${className || ""}`;
		}

		componentWillReceiveProps(newProps) {
			this.setState({ className: this.getClassName(newProps.className) })
		}

		render() {
			return <ComposedComponent className={this.state.className} {...this.props} />
		}
	}
}

export const Container = MergeClassNames("container")("div");

export const Row = MergeClassNames("row")("div");

export class Col extends React.Component {
	classNameFromProperty(classPrefix, propertyValue) {
		if(propertyValue === undefined) {
			return null;
		}

		return classPrefix + propertyValue;
	}

	getClassName() {
		return [
			this.classNameFromProperty("col-md-", this.props.md),
			this.classNameFromProperty("col-md-push-", this.props.mdPush),
			this.classNameFromProperty("col-md-offset-", this.props.mdOffset),

			this.classNameFromProperty("col-xs-", this.props.xs),
			this.classNameFromProperty("col-xs-push-", this.props.xsPush),
			this.classNameFromProperty("col-xs-offset-", this.props.xsOffset)
		]
		.filter(a => a)
		.join(" ");
	}

	render() {
		return <div className={this.getClassName()} {...this.props}>{this.props.children}</div>
	}
}
