import React from 'react';
import { Menu } from 'semantic-ui-react';

class GamePanel extends React.Component {

	render() {

		return (
			<div className="main_body text-gray interface">
				<div className="header-center-wrap">
					<Menu stackable className="header-wrap">
						<Menu.Item className="semi-wide" as="div">
							123
						</Menu.Item>
						<Menu.Item className="semi-wide" as="div">
							Wins: 10
						</Menu.Item>
						<Menu.Item className="semi-wide">
							Defeats: 3
						</Menu.Item>
						<Menu.Item className="semi-wide" position="right">
							0
						</Menu.Item>
					</Menu>
				</div>
				<div id="game-container" />
			</div>
		);
	}

}

export default GamePanel;
