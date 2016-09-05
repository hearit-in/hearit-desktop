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

import platform from '../helpers/platform';

export default class MainView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<ThemeProvider>
				<div>
					<div style={{
						WebkitUserSelect: "none",
						WebkitAppRegion: "drag",
						
						position: "fixed",
						left: 0,
						right: 0,
						[ platform == "osx" ? "top" : "bottom" ]: 0,
						padding: "8px 0px",
						color: "#999",
						fontFamily: "Roboto",
						fontWeight: 300,
						boxShadow: `0px 1px 2px rgba(0,0,0, 0.3)`,
						textAlign: "center",
						background: "rgba(0, 0, 0, 0.5)"
					}}>
						{ platform !== "osx" ? null :
							<span>Hearit Player</span>
						}
						
						<div style={{
							float: "right",
							marginRight: 10,
							fontWeight: 200
						}}>
							<ConnectionStateBadge />
						</div>
					</div>
					
					<div>{ this.props.children }</div>
					
				</div>
			</ThemeProvider>
		</div>
	}
}

MainView.propTypes = {
};
