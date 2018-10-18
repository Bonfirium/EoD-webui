import React from 'react';

export default class Login extends React.Component {

	render() {
		return (
			<form
				id="login"
				className="full-screen"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(this.privateKeyInput.value);
				}}
			>
				<div>Inter your private key</div>
				<input type="text" ref={(node) => this.privateKeyInput = node} />
				<button>Submit</button>
			</form>
		);
	}

}
