import { Apis } from 'echojs-ws';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import { onConnected } from '../actions/GlobalActions';

class App extends React.Component {

	constructor(...args) {
		super(...args);
		Apis.instance('wss://echo-dev.io/ws', true).init_promise.then(() => this.props.onConnected());
	}

	render() {
		if (!this.props.isConnected) return <div className="full-screen">Connecting to ECHO...</div>;
		return <Login />
	}

}

App.propTypes = {
	isConnected: PropTypes.bool.isRequired,
	onConnected: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		isConnected: state.global.isConnected,
	}),
	(dispatch) => ({
		onConnected: () => dispatch(onConnected()),
	})
)(App);
