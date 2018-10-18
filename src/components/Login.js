import { PrivateKey } from 'echojs-lib';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/UserActions';

class Login extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = { loginStarted: false, error: null };
	}

	render() {
		return (
			<form
				id="login"
				className="full-screen"
				onSubmit={async (e) => {
					e.preventDefault();
					this.setState({ loginStarted: true });
					const privateKey = PrivateKey.fromWif(this.privateKeyInput.value);
					this.props.login(privateKey);
				}}
			>
				<div>Inter your private key</div>
				<input type="text" ref={(node) => this.privateKeyInput = node} disabled={this.state.loginStarted} />
				<div id="status" className={this.state.error ? 'error' : 'hint'}>
					{this.state.loginStarted ? 'Authorization...' : ''}
				</div>
				<button disabled={this.state.loginStarted}>Submit</button>
			</form>
		);
	}

}

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		login: (publicKey) => dispatch(login(publicKey)),
	}),
)(Login);
