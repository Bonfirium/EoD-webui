import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import StartPage from './containers/StartPage';

import { MAIN_PATH, START_PATH, GAME_PATH } from './constants/GlobalConstants';
import GamePanel from './containers/GamePanel';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route exact path={MAIN_PATH} component={Dashboard} />
					<Route exact path={START_PATH} component={StartPage} />
					<Route exact path={GAME_PATH} component={GamePanel} />
				</Switch>
			</App>
		);
	}

}
