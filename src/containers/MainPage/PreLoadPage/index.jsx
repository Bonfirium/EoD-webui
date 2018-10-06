import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import TextInput from '../../../components/Forms/TextInput';
import FormActions from '../../../actions/FormActions';
import AuthAction from '../../../actions/AuthAction';
import { MAIN_FORM } from '../../../constants/FormConstants';
import initPixi from '../../../game-core/app';

class PreLoadPage extends Component {

	componentDidMount() {
		this.props.clearForm();
		initPixi();
	}

	render() {
		return (
			<div>
				<Form.Field>
					Please enter your private key
					<TextInput
						className={`wide ${this.props.error ? 'error' : ''}`}
						onChange={(value) => this.props.setFormValue(['privateKey'], value)}
						value={this.props.value}
					/>
				</Form.Field>
				<div className="button-wrapper ta-center">
					<Button className="button-wrapper submit-button" onClick={() => this.props.login()} secondary type="button" content="Submit" />
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
	login: PropTypes.func.isRequired,
	error: PropTypes.any.isRequired,
};

PreLoadPage.defaultProps = {
	value: '',
	onClick: () => {},
};

export default connect(
	(state) => ({
		value: state.form.getIn([MAIN_FORM, 'privateKey']),
		error: state.form.getIn([MAIN_FORM, 'error']),
	}),
	(dispatch) => ({
		setFormValue: (field, value) => dispatch(FormActions.setFormValue(MAIN_FORM, field, value)),
		clearForm: () => dispatch(FormActions.clearForm(MAIN_FORM)),
		login: () => dispatch(AuthAction.login()),
	}),
)(PreLoadPage);
