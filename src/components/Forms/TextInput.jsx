import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';


const TextInput = (props) => {
	const {
		className, value, onChange, error, placeholder, children, ...options
	} = props;

	const onChangeValue = (e) => {
		props.onChange(e.target.value);
	};

	return (
		<div className="field">
			<Input
				className={`${className} ${error ? 'error' : ''}`}
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChangeValue(e)}
				{...options}
			/>
		</div>
	);
};

TextInput.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.any,
};

TextInput.defaultProps = {
	className: '',
	value: '',
	placeholder: '',
	error: '',
	children: '',
};

export default TextInput;
