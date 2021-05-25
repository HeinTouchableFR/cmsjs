import React, { useState } from 'react';
import styles from 'components/Form/Checkbox/Checkbox.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

export default function Checkbox({ label,
    defaultChecked,
    name,
    required,
    onChange,
    iconTip,
    tip,
    tipWidth,
    disabled }) {
    const [checked, setChecked] = useState(defaultChecked);

    const handleChange = (e) => {
        setChecked(e.currentTarget.checked);
        if (onChange) {
            const data = {
                name, value: e.currentTarget.checked,
            };
            onChange(e, data);
        }
    };

    return (
        <>
            <div className={`${styles.field} ${required && styles.required}`}>
                <input
                    type='checkbox'
                    id={name}
                    name={name}
                    required={required}
                    onChange={handleChange}
                    checked={checked || ''}
                    disabled={disabled}
                    hidden
                />
                <label htmlFor={name}>
                    <span className={styles.switch} />
                    {label}
                    {' '}
                    {tip && (
                        <Tooltip
                            tip={tip}
                            iconTip={iconTip}
                            tipWidth={tipWidth}
                        />
                    )}
                </label>
            </div>
        </>
    );
}

Checkbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultChecked: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    tip: PropTypes.string,
    tipWidth: PropTypes.number,
    iconTip: PropTypes.string,
};

Checkbox.defaultProps = {
    label: '',
    required: false,
    disabled: false,
    defaultChecked: false,
    tip: '',
    tipWidth: null,
    iconTip: 'fa-question-circle',
};
