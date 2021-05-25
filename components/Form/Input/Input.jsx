import React, {
    useEffect,
    useState,
} from 'react';
import styles from 'components/Form/Input/Input.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

export default function Input({ label,
    subLabel,
    defaultValue,
    name,
    placeholder,
    type,
    required,
    onChange,
    step,
    min,
    max,
    error,
    iconTip,
    tip,
    tipWidth,
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

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <>
            <div className={`${styles.field} ${required && styles.required}`}>
                <label htmlFor={name}>
                    {label}
                    {' '}
                    {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
                    {tip && (
                    <Tooltip
                        tip={tip}
                        iconTip={iconTip}
                        tipWidth={tipWidth}
                    />
                    )}
                </label>
                <div className={`${styles.ui}`}>
                    <input
                        className={`${error !== '' && styles.error}`}
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
                    {error && <span className={styles.error}>{error}</span>}
                </div>
            </div>
        </>
    );
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    subLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
        }),
        PropTypes.arrayOf({
        }),
    ]),
    placeholder: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    tip: PropTypes.string,
    tipWidth: PropTypes.number,
    iconTip: PropTypes.string,
};

Input.defaultProps = {
    label: '',
    subLabel: '',
    placeholder: '',
    type: 'text',
    required: false,
    disabled: false,
    defaultValue: '',
    error: '',
    min: '',
    max: '',
    step: '',
    tip: '',
    tipWidth: null,
    iconTip: 'fa-question-circle',
};
