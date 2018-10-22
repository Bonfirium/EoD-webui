import React from 'react';
import { connect } from 'react-redux';

import DefaultProfileImg from '../assets/images/ui/default_profile.png';
import { findGame } from '../actions/ContractActions';

const STATE = {
	NONE: 0,
	BROADCASTING: 1,
	GETTING_GAME_ID: 2,
	WAITING_FOR_OTHER_PLAYERS: 3,
	GETTING_GAME_STATIC: 4,
};

class Lobby extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = { value: STATE.NONE };
	}

	render() {
		return (
			<div id="lobby">
				<div>
					<div id="profile-info">
						<img src={DefaultProfileImg} />
						<div>
							<p>{this.props.name}</p>
							<span>{this.props.id}</span>
						</div>
					</div>
					<div id="find-game-btn" onClick={async () => {
						if (this.state.value !== STATE.NONE) return;
						this.setState({ value: STATE.BROADCASTING });
						this.props.findGame({
							onBroadcast: () => this.setState({ value: STATE.GETTING_GAME_ID }),
							onGetGameId: () => this.setState({ value: STATE.WAITING_FOR_OTHER_PLAYERS }),
							onFullGame: () => this.setState({ value: STATE.GETTING_GAME_STATIC }),
						});
					}}>
						{this.state.value === STATE.NONE ? 'FIND GAME' :
							<React.Fragment>
								<div className="loader" />
								<span>{{
									[STATE.BROADCASTING]: 'Searching for the game',
									[STATE.GETTING_GAME_ID]: 'Getting game id',
									[STATE.WAITING_FOR_OTHER_PLAYERS]: 'Waiting for other players',
									[STATE.GETTING_GAME_STATIC]: 'Connecting to the game',
								}[this.state.value]}...</span>
							</React.Fragment>}
					</div>
				</div>
				<div>TBD in v0.2: statistic and games history</div>
			</div>
		);
	}

}

export default connect(
	(state) => ({
		name: state.user.name,
		id: state.user.id,
	}),
	(dispatch) => ({
		findGame: (params) => dispatch(findGame(params)),
	}),
)(Lobby);
