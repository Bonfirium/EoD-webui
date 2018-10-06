import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import GlobalActions from '../actions/GlobalActions';

class App extends React.Component {

	componentWillMount() {
		this.props.node_connect();
	}

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
	node_connect: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		node_connect: () => dispatch(GlobalActions.connect()),
	}),
)(App);
