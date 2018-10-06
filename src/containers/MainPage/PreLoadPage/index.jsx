import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import TextInput from '../../../components/Forms/TextInput';
import FormActions from '../../../actions/FormActions';
import { MAIN_FORM } from '../../../constants/FormConstants';

class PreLoadPage extends Component {

	componentDidMount() {
		this.props.clearForm();
	}

	render() {
		return (
			<div>
				<Form.Field>
					Please enter your private key
					<TextInput
						className="wide"
						onChange={(value) => this.props.setFormValue(['privateKey'], value)}
						value={this.props.value}
					/>
				</Form.Field>
				<div className="button-wrapper ta-center">
					<Button className="button-wrapper submit-button" onClick={(e) => this.props.onClick(e)} secondary type="button" content="Submit" />
				</div>
			</div>
		);
	}

}

PreLoadPage.propTypes = {
	value: PropTypes.string,
	onClick: PropTypes.func,
	setFormValue: PropTypes.func.isRequired,
	clearForm: PropTypes.func.isRequired,
};

PreLoadPage.defaultProps = {
	value: '',
	onClick: () => {},
};

export default connect(
	(state) => ({
		value: state.form.getIn([MAIN_FORM, 'privateKey']),
	}),
	(dispatch) => ({
		setFormValue: (field, value) => dispatch(FormActions.setFormValue(MAIN_FORM, field, value)),
		clearForm: () => dispatch(FormActions.clearForm(MAIN_FORM)),
	}),
)(PreLoadPage);
