import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class StartPage extends Component {

	render() {
		return (
			<div className="center-wrap">
				<div className="start-page">
					<h1 className="form-title">
						Welcome to EoD
					</h1>

					<div className="button-wrapper ta-center">
						<Button className="button-wrapper Big submit-button" primary content="Start game" />
					</div>
				</div>

			</div>
		);
	}

}

StartPage.propTypes = {};

export default StartPage;
