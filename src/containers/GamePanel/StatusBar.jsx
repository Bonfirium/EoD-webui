import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

class StatusBar extends React.Component {

	render() {
		const { status } = this.props;
		return (
			<Menu.Item className="semi-wide">
				{status}
			</Menu.Item>
		);
	}

}

StatusBar.propTypes = {
	status: PropTypes.string,
};

StatusBar.defaultProps = {
	status: '',
};

export default connect(
	(state) => ({
		status: state.global.get('status'),
	}),
	() => ({}),
)(StatusBar);
