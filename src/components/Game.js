import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { D12, GAME_STATUSES, MAP_HEIGHT, MAP_WIDTH } from '../helpers/constants';
import comprehension from '../helpers/comprehension';
import { isOnMap } from '../helpers/common';
import { getGameState, move } from '../actions/ContractActions';
import { setStatus } from '../actions/GameActions';

const CELL = {
	WALL: 3,
	EMPTY: 2,
};

class Game extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = { selectedPositions: null, status: null };
	}

	componentWillMount() {
		this.map = comprehension(MAP_WIDTH, () => comprehension(MAP_HEIGHT, () => CELL.WALL));
		this.props.roomsPositions.forEach(({ x, y }) => {
			this.map[x][y] = CELL.EMPTY;
		});
	}

	render_map() {
		const result = [];
		const activeCells = new Set();
		this.props.roomsPositions.forEach(({ x, y, id }) => {
			if (this.props.status === GAME_STATUSES.START_POSITION_SELECTION) activeCells.add(id);
			result.push(
				<div
					className="room"
					style={{ top: `${y * 32}px`, left: `${x * 32}px` }}
					key={`room#${id}`}
				/>,
			);
			for (let i = 0; i < 6; i++) {
				const { dx, dy } = D12[i];
				const nearX = x + dx;
				const nearY = y + dy;
				if (!isOnMap(nearX, nearY)) continue;
				if (this.map[nearX][nearY] !== CELL.WALL) {
					result.push(
						<div
							className="door"
							style={{ top: `${(y + nearY) * 16 + 32}px`, left: `${(x + nearX) * 16 + 32}px` }}
							key={`door#${id}.${i}`}
						/>,
					);
				}
			}
		});
		this.props.monstersPositions.forEach(({ x, y, id }, index) => {
			result.push(
				<div
					className="monster"
					style={{ top: `${y * 32 + 32}px`, left: `${x * 32 + 32}px` }}
					key={`monster#${index}`}
				/>,
			);
			if (this.props.status === GAME_STATUSES.START_POSITION_SELECTION) {
				activeCells.delete(id);
				for (let i = 0; i < 12; i++) {
					const { dx, dy } = D12[i];
					const nearX = x + dx;
					const nearY = y + dy;
					activeCells.delete(nearX + nearY * MAP_WIDTH);
				}
			}
		});
		(this.props.humansPositions ? this.props.humansPositions : []).forEach(({ x, y, id }, index) => {
			result.push(
				<div
					className="human"
					style={{ top: `${y * 32 + 32}px`, left: `${x * 32 + 32}px` }}
					key={`human#${index}`}
				/>
			)
		});
		this.props.chestsPositions.forEach(({ x, y, id }, index) => {
			result.push(
				<div
					className="chest"
					style={{ top: `${y * 32 + 32}px`, left: `${x * 32 + 32}px` }}
					key={`chest#${index}`}
				/>,
			);
			if (this.props.status === GAME_STATUSES.START_POSITION_SELECTION) activeCells.delete(id);
		});
		this.props.roomsPositions.forEach(({ x, y, id }) => {
			result.push(
				<div
					className={'selector ' +
					(!this.state.status && activeCells.has(id) ? 'active' : '') +
					(this.state.selectedPositions === id ? 'selected' : '')}
					style={{ top: `${y * 32}px`, left: `${x * 32}px` }}
					key={`selector#${id}`}
					onClick={async () => {
						await this.props.move(x, y, {
							onValidate: () => this.props.setStatus(GAME_STATUSES.SENDING_MOVE),
							onBroadcast: () => this.props.setStatus(GAME_STATUSES.VALIDATION),
						});
						this.props.setStatus(GAME_STATUSES.GETTING_GAME_STATUS);
						await this.props.getGameState();
					}}
				>
					<div className="loader"/>
				</div>,
			);
		});
		return result;
	}

	render() {
		return (
			<div id="game">
				<header>{this.state.status || {
					[GAME_STATUSES.START_POSITION_SELECTION]: 'Select start position',
					[GAME_STATUSES.WAITING_FOR_HUMANS_START_POSITIONS]: 'Waiting for start of the game...',
					[GAME_STATUSES.SENDING_MOVE]: 'Sending move to smart-contract...',
					[GAME_STATUSES.VALIDATION]: 'Move validation...',
					[GAME_STATUSES.GETTING_GAME_STATUS]: 'Getting game status...',
					[GAME_STATUSES.WAITING_FOR_OPPONENTS_MOVE]: 'Waiting for opponents move...',
				}[this.props.status]}</header>
				<div id="dungeon">
					{this.render_map()}
				</div>
			</div>
		);
	}

}

Game.propTypes = {
	status: PropTypes.string.isRequired,
	chestsPositions: PropTypes.array.isRequired,
	monstersPositions: PropTypes.array.isRequired,
	humansPositions: PropTypes.array,
	roomsPositions: PropTypes.array.isRequired,
	move: PropTypes.func.isRequired,
	setStatus: PropTypes.func.isRequired,
	getGameState: PropTypes.func.isRequired,
};

Game.defaultProps = {
	humansPositions: [],
};

export default connect(
	(state) => ({
		status: state.game.status,
		chestsPositions: state.game.chestsPositions,
		monstersPositions: state.game.monstersPositions,
		humansPositions: state.game.humansPositions,
		roomsPositions: state.game.roomsPositions,
	}),
	(dispatch) => ({
		move: (x, y, cbs) => dispatch(move(x, y, cbs)),
		setStatus: (status) => dispatch(setStatus(status)),
		getGameState: () => dispatch(getGameState()),
	}),
)(Game);
