import React from 'react';
import { connect } from 'react-redux';

import PreLoadPage from './PreLoadPage';

class MainPage extends React.Component {

	render() {
		return (
			<div>
				<div className="center-wrap">
					<PreLoadPage />
				</div>
			</div>
		);
	}

}

export default connect(
	() => ({
	}),
	() => ({
	}),
)(MainPage);

