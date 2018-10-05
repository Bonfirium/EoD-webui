import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const DropdownInput = (props) => {
	const {
		value, opts, onChange, className, ...options
	} = props;

	const onChangeValue = (e, data) => {
		props.onChange(data.value);
	};

	return (
		<Dropdown
			fluid
			search
			className={`select ${className}`}
			selection
			value={value}
			options={opts}
			onChange={(e, data) => onChangeValue(e, data)}
			selectOnBlur={false}
			{...options}
		/>
	);
};


DropdownInput.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	opts: PropTypes.array,
	onChange: PropTypes.func.isRequired,
};

DropdownInput.defaultProps = {
	className: '',
	value: '',
	opts: [],
};

export default DropdownInput;
