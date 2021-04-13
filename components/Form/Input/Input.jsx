import React, { useState } from 'react';
import styles from 'components/Form/Input/Input.module.scss';
import PropTypes from 'prop-types';

export default function Input({ label,
    defaultValue,
    name,
    placeholder,
    type,
    required,
    onChange,
    step,
    min,
    max,
    disabled }) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (onChange) {
            const data = {
                name, value: e.target.value,
            };
            onChange(e, data);
        }
    };

    return (
        <>
            <div className={`${styles.field} ${required && styles.required}`}>
                <label htmlFor={name}>{label}</label>
                <div className={`${styles.ui}`}>
                    <input
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        required={required}
                        onChange={handleChange}
                        value={value || ''}
                        step={step}
                        min={min}
                        max={max}
                        disabled={disabled}
                    />
                </div>
            </div>
        </>
    );
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
};

Input.defaultProps = {
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    disabled: false,
    defaultValue: '',
    min: '',
    max: '',
    step: '',
};
