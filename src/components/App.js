import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import * as GlobalActions from '../actions/GlobalActions';
import Lobby from './Lobby';
import Game from './Game';

class App extends React.Component {

	constructor(...args) {
		super(...args);
	}

	async componentWillMount() {
		this.props.connect();
	}

	render() {
		if (!this.props.isConnected) return <div className="full-screen">Connecting to ECHO...</div>;
		if (!this.props.isLogged) return <Login />;
		if (!this.props.isInGame) return <Lobby />;
		return <Game />;
	}

}

App.propTypes = {
	isConnected: PropTypes.bool.isRequired,
	isLogged: PropTypes.bool.isRequired,
	isInGame: PropTypes.bool.isRequired,
	connect: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		isConnected: state.global.isConnected,
		isLogged: state.global.isLogged,
		isInGame: state.global.isInGame,
	}),
	(dispatch) => ({
		connect: () => dispatch(GlobalActions.connect()),
	})
)(App);
