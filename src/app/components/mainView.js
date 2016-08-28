import React, {PropTypes} from 'react';
import {
	AppBar
} from 'material-ui';

import * as Color from 'material-ui/styles/colors';

import Track from './track';
import ThemeProvider from './themeProvider';
import ConnectionStateBadge from './connectionStateBadge';

import { fromJS } from 'immutable';
import { Container } from './layout';

export default class MainView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<ThemeProvider>
				<div>
					{/* <AppBar
						showMenuIconButton={false}
						title="hearit.in"
						titleStyle={{
							textAlign: "center",
							fontSize: "1.2em",
							fontFamily: "Roboto",
							fontWeight: 300,
							height: 36,
							lineHeight: "38px"
						}}
						style={{
							height: 36,
							background: Color.purple700,//"rgba(35, 35, 50, 1)",
							boxShadow: `
								inset 0px -3px 3px rgba(40, 40, 60, 0.02)
							`
						}}>
					</AppBar> */}
					
					<div>{ this.props.children }</div>
					
				</div>
			</ThemeProvider>
		</div>
	}
}

MainView.propTypes = {
};
