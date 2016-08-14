import React, {PropTypes} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as color from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { merge } from 'lodash';

const rawTheme = merge({}, lightTheme, {
	palette: {
		primary1Color: color.purple500,
		primary2Color: color.blue500,
		primary3Color: color.purple300,
		accent1Color: color.blue500,
		accent2Color: color.blue500,
		accent3Color: color.blue500
	}
});

const muiTheme = getMuiTheme(rawTheme);

class ThemeProvider extends React.Component {
	render() {
		return <MuiThemeProvider muiTheme={muiTheme}>{this.props.children}</MuiThemeProvider>
	}
}

export default ThemeProvider;