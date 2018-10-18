import { PrivateKey } from 'echojs-lib';
import React from 'react';

export default class Login extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = { loginStarted: false, error: null };
	}

	render() {
		return (
			<form
				id="login"
				className="full-screen"
				onSubmit={(e) => {
					e.preventDefault();
					this.setState({ loginStarted: true });
					const privateKey = PrivateKey.fromWif(this.privateKeyInput.value);
					const publicKey = privateKey.toPublicKey();
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
