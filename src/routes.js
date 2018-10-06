import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import StartPage from './containers/StartPage';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/start" component={StartPage} />
				</Switch>
			</App>
		);
	}

}
