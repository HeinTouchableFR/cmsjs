import React, { useState } from 'react';
import styles from 'components/Form/Input/Input.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

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
    iconTip,
    tip,
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
                <label htmlFor={name}>
                    {label}
                    {' '}
                    {tip && (
                    <Tooltip
                        tip={tip}
                        iconTip={iconTip}
                    />
                    )}
                </label>
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
    tip: PropTypes.string,
    iconTip: PropTypes.string,
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
    tip: '',
    iconTip: 'la-question-circle',
};
