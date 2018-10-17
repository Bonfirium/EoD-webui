import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu } from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import AuthAction from '../../actions/AuthAction';
import ContractAction from '../../actions/ContractAction';

class StartPage extends Component {

	componentDidMount() {
		this.props.checkAccountInfo();
	}

	render() {
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
						<div className="button-wrapper ta-center">
							<Button className="button-wrapper Big submit-button" onClick={() => this.props.getNextGameId()} primary content="getNextGameId" />
						</div>
						<div className="button-wrapper ta-center">
							<Button className="button-wrapper Big submit-button" onClick={() => this.props.getDungeon()} primary content="getDungeon" />
						</div>
						<div className="button-wrapper ta-center">
							<Button className="button-wrapper Big submit-button" onClick={() => this.props.getGameState()} primary content="getGameState" />
						</div>
					</div>

				</div>
			</React.Fragment>
		);
	}

}

StartPage.propTypes = {
	user: PropTypes.object,
	checkAccountInfo: PropTypes.func,
	startGame: PropTypes.func,
	getNextGameId: PropTypes.func.isRequired,
	getDungeon: PropTypes.func.isRequired,
	getGameState: PropTypes.func.isRequired,
};

StartPage.defaultProps = {
	user: {},
	checkAccountInfo: () => {},
	startGame: () => {},
};

export default connect(
	(state) => ({
		user: state.global.getIn(['user']),
	}),
	(dispatch) => ({
		checkAccountInfo: () => dispatch(AuthAction.checkAccountInfo()),
		startGame: () => dispatch(AuthAction.startGame()),
		getNextGameId: () => dispatch(ContractAction.getNextGameId()),
		getDungeon: () => dispatch(ContractAction.getStaticData()),
		getGameState: () => dispatch(ContractAction.getGameState()),
	}),
)(StartPage);
