import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Hero from '../../assets/images/game/hero_01_true.png'
import Ogr from '../../assets/images/game/ogr_01_true.png'
import Chest from '../../assets/images/game/chest_128.png'

class GamePanel extends React.Component {

	render() {

		return (
			<div className="main_body text-gray interface">
				<div className="header-center-wrap">
					<Menu stackable className="header-wrap">
						<Menu.Item className="semi-wide" as="div">
							<img src={Hero} />
							4
						</Menu.Item>
						<Menu.Item className="semi-wide" as="div">
							<img src={Ogr} />
							4
						</Menu.Item>
						<Menu.Item className="semi-wide">
							<img src={Chest} />
							11
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
