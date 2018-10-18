import React from 'react';
import { Apis } from 'echojs-ws';

import Login from './Login';

export default class App extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = { isLogged: false, isConnected: false };
		Apis.instance('wss://echo-dev.io/ws', true).init_promise.then(() => this.setState({ isConnected: true }));
	}

	render() {
		if (!this.state.isConnected) return <div className="full-screen">Connecting to ECHO...</div>;
		return <Login />
	}

}
