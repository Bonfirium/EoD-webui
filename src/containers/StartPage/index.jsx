import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu } from 'semantic-ui-react';

class StartPage extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="header-center-wrap">
					<Menu stackable className="header-wrap">
						<Menu.Item className="semi-wide" as="div">
							{this.props.userDisplayName}
						</Menu.Item>
						<Menu.Item className="semi-wide" position="right">
							{this.props.tokensAmount}
						</Menu.Item>
					</Menu>
				</div>

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
			</React.Fragment>
		);
	}

}

StartPage.propTypes = {
	userDisplayName: PropTypes.string,
	tokensAmount: PropTypes.string,
};

StartPage.defaultProps = {
	userDisplayName: 'UserName',
	tokensAmount: 'TokensAmount',
};

export default StartPage;
