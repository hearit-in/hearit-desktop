import React from 'react';
import { RaisedButton, SvgIcon } from 'material-ui';

import { NavigationClose } from 'material-ui/svg-icons';


export default (props) =>
	<RaisedButton
		{...props}
		label="Logg inn med Facebook"
		backgroundColor="#3b5998"
		labelColor="#fff"
		icon={
			<SvgIcon viewBox="0 0 280 280" color="#ffffff">
				<path d="M252.2,0H14.7C6.6,0,0,6.6,0,14.7v237.4c0,8.1,6.6,14.7,14.7,14.7h127.8V163.5h-34.8v-40.3h34.8
					V93.6c0-34.5,21.1-53.2,51.8-53.2c14.7,0,27.4,1.1,31.1,1.6v36l-21.3,0c-16.7,0-20,7.9-20,19.6v25.7H224l-5.2,40.3h-34.7v103.4h68
					c8.1,0,14.7-6.6,14.7-14.7V14.7C266.9,6.6,260.3,0,252.2,0z"/>
			</SvgIcon>
		} />