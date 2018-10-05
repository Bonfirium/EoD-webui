import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {

	renderModals() {
		return (
			<div />
		);
	}

	render() {
		const { children } = this.props;
		return (
			<div className="wrapper">
				{children}
				{this.renderModals()}
			</div>
		);
	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
};

export default App;
