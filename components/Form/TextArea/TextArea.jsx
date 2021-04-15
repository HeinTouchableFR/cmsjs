import React, { useState } from 'react';
import styles from 'components/Form/TextArea/TextArea.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

export default function TextArea({ label,
    defaultValue,
    name,
    placeholder,
    minLength,
    maxLength,
    rows,
    required,
    onChange,
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
                    <textarea
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        onChange={handleChange}
                        disabled={disabled}
                        rows={rows}
                        minLength={minLength}
                        maxLength={maxLength}
                        defaultValue={value}
                    />
                </div>
            </div>
        </>
    );
}

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    tip: PropTypes.string,
    iconTip: PropTypes.string,
};

TextArea.defaultProps = {
    label: '',
    placeholder: '',
    rows: '5',
    required: false,
    disabled: false,
    defaultValue: '',
    minLength: '0',
    maxLength: '240',
    tip: '',
    iconTip: 'la-question-circle',
};
