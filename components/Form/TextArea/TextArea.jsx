import React, {
    useEffect,
    useState,
} from 'react';
import styles from 'components/Form/TextArea/TextArea.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

const TextArea = React.forwardRef(({ label,
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
    tipWidth,
    disabled }, ref) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        if (onChange) {
            setValue(e.target.value);
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
                    {tip && (
                        <Tooltip
                            tip={tip}
                            iconTip={iconTip}
                            tipWidth={tipWidth}
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
                        ref={ref}
                    />
                </div>
            </div>
        </>
    );
});

export default TextArea;

TextArea.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    tip: PropTypes.string,
    iconTip: PropTypes.string,
    tipWidth: PropTypes.number,
};

TextArea.defaultProps = {
    label: '',
    onChange: null,
    placeholder: '',
    rows: '5',
    required: false,
    disabled: false,
    defaultValue: '',
    minLength: 0,
    maxLength: 240,
    tip: '',
    tipWidth: null,
    iconTip: 'fa-question-circle',
};
