import BaseComponent from './_base';
import Background from './background';
import Room from './room';

export default class GameComponent extends BaseComponent {

	constructor(pixiWidht, pixiHeight) {
		super();
		this._pixiWidht = pixiWidht;
		this._pixiHeight = pixiHeight;
		const background = new Background();
		this.container.addChild(background.container);

		for (let x = 0, y = 0; x < 10; x++, y++) {
			// const room = new Room(x, y);
			// this.container.addChild(room.container);
		}

		// const inGamePanel = new InGamePanel();
		// this.container.addChild(inGamePanel.container);
		// const officePresenter = new OfficePresenter(this._pixiWidht - 256, this._pixiHeight - 96 - 256);
		// officePresenter.x = this._pixiWidht / 2;
		// officePresenter.y = (this._pixiHeight - 96) / 2;
		// this.container.addChild(officePresenter.container);
	}

}
