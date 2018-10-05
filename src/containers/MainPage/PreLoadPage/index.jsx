import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../components/Forms/TextInput';

class PreLoadPage extends Component {

	render() {
		return (
			<div>
				<Form.Field>
					Please enter your private key
					<TextInput
						className="wide"
						onChange={(value) => this.onChange(value)}
						// value={this.props.value}
					/>
				</Form.Field>
				<div className="button-wrapper ta-center">
					<Button className="button-wrapper submit-button" onClick={(e) => this.onClick(e)} secondary type="button" content="Submit" />
				</div>
			</div>
		);
	}

}

PreLoadPage.propTypes = {};

export default PreLoadPage;
