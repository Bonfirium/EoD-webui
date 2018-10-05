import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormActions from '../../actions/FormActions';

import PreLoadPage from './PreLoadPage';

class MainPage extends React.Component {

	clearInfo() {
		this.props.clearForm('mainForm');
	}

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

MainPage.propTypes = {
	// setFormValue: PropTypes.func.isRequired,
	// clearByField: PropTypes.func.isRequired,
	clearForm: PropTypes.func.isRequired,
};

export default connect(
	() => ({
	}),
	(dispatch) => ({
		setFormValue: (form, field, value) => dispatch(FormActions.setFormValue(form, field, value)),
		clearByField: (form, field) => dispatch(FormActions.clearByField(form, field)),
		clearForm: (form) => dispatch(FormActions.clearForm(form)),
	}),
)(MainPage);

