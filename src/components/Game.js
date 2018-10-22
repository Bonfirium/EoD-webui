import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { D12, GAME_STATUSES, MAP_HEIGHT, MAP_WIDTH } from '../helpers/constants';
import comprehension from '../helpers/comprehension';
import { isOnMap } from '../helpers/common';

const CELL = {
	WALL: 3,
	EMPTY: 2,
};

class Game extends React.Component {

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
					className={`selector ${activeCells.has(id) ? 'active' : ''}`}
					style={{ top: `${y * 32}px`, left: `${x * 32}px` }}
					key={`selector#${id}`}
				/>,
			);
			if (activeCells.has(id)) {
				result.push(
					<div className="move-target" key={`move-target#${id}`} />
				);
			}
		});
		return result;
	}

	render() {
		return (
			<div id="game">
				<header>{{
					[GAME_STATUSES.START_POSITION_SELECTION]: 'Select start position',
					[GAME_STATUSES.WAITING_FOR_HUMANS_START_POSITIONS]: 'Waiting for start of the game',
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
	roomsPositions: PropTypes.array.isRequired,
};

export default connect((state) => ({
	status: state.game.status,
	chestsPositions: state.game.chestsPositions,
	monstersPositions: state.game.monstersPositions,
	roomsPositions: state.game.roomsPositions,
}))(Game);
