import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { D12, MAP_HEIGHT, MAP_WIDTH } from '../helpers/constants';
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
		this.props.roomsPositions.forEach(({ x, y, id }) => {
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
							style={{ top: `${(y + nearY) * 16 + 22}px`, left: `${(x + nearX) * 16 + 22}px` }}
							key={`door#${id}.${i}`}
						/>
					)
				}
			}
		});
		return result;
	}

	render() {
		return (
			<div id="game">
				<div id="dungeon">
					{this.render_map()}
				</div>
			</div>
		);
	}

}

Game.propTypes = {
	roomsPositions: PropTypes.array.isRequired,
};

export default connect((state) => ({
	roomsPositions: state.game.roomsPositions,
}))(Game);
