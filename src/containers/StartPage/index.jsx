import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu } from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import AuthAction from '../../actions/AuthAction';

class StartPage extends Component {

	componentDidMount() {
		this.props.getAccountInfo();
	}

	render() {
		const { balance } = this.props;
		let { user } = this.props;
		if (user && Object.keys(user).length > 0) {
			user = user.toJS();
		}

		return (
			<React.Fragment>
				<div className="header-center-wrap">
					<Menu stackable className="header-wrap">
						<Menu.Item className="semi-wide" as="div">
							{(user && user.name) || ''}
						</Menu.Item>
						<Menu.Item className="semi-wide" position="right">
							{`Tokens: ${balance || 0}`}
						</Menu.Item>
					</Menu>
				</div>

				<div className="center-wrap">

					<div className="start-page">
						<h1 className="form-title">
						Welcome to EoD
						</h1>

						<div className="button-wrapper ta-center">
							<Button className="button-wrapper Big submit-button" onClick={() => this.props.startGame()} primary content="Start game" />
						</div>
					</div>

				</div>
			</React.Fragment>
		);
	}

}

StartPage.propTypes = {
	user: PropTypes.object,
	balance: PropTypes.number,
	getAccountInfo: PropTypes.func,
	startGame: PropTypes.func,
};

StartPage.defaultProps = {
	user: {},
	balance: 0,
	getAccountInfo: () => {},
	startGame: () => {},
};

export default connect(
	(state) => ({
		user: state.global.getIn(['user']),
		balance: state.global.getIn(['balance']),
	}),
	(dispatch) => ({
		getAccountInfo: () => dispatch(AuthAction.getAccountInfo()),
		startGame: () => dispatch(AuthAction.startGame()),
	}),
)(StartPage);
