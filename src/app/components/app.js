import React, {PropTypes} from 'react';
import {
	AppBar
} from 'material-ui';

import Track from './track';
import ThemeProvider from './themeProvider';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<ThemeProvider>
				<div>
					<AppBar
						title="hearit.in" />

					<Track />
				</div>
			</ThemeProvider>
		</div>
	}
}

App.propTypes = {
};
