import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route path="/" component={Dashboard} />
				</Switch>
			</App>
		);
	}

}
