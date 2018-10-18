import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {

	render() {
		return (
			<div id="game">
				<div id="dungeon">
					{this.props.roomsPositions.map(({ x, y, id }) => (
						<div
							className="room"
							style={{ top: `${y * 32}px`, left: `${x * 32}px` }}
							key={id}
						/>
					))}
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
