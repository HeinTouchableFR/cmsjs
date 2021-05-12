import React, {
    useEffect, useRef, useState,
} from 'react';
import styles from 'components/Form/Dropdown/Dropdown.module.scss';
import PropTypes from 'prop-types';
import Option from './Component/Option';
import SelectedOption from './Component/SelectedOption';
import Tooltip from '../Tooltip/Tooltip';

export default function Dropdown({ name,
    label,
    position,
    options,
    multiple,
    defaultValue,
    iconTip,
    tip,
    onChange,
    searchable }) {
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const [isExpend, setIsExpend] = useState(false);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(defaultValue || (multiple ? [] : ''));

    const handleExpend = () => {
        setIsExpend(true);
    };

    const handleChange = (worth) => {
        const data = {
            name, value: worth,
        };
        onChange(wrapperRef, data);
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleItemClick = (item) => {
        let tmp;
        if (multiple) {
            tmp = value.includes(item.value)
                ? value.filter((worth) => worth !== item.value)
                : [...value, item.value];
        } else {
            tmp = item.value;
            setIsExpend(false);
            setSearch('');
        }
        setValue(tmp);
        handleChange(tmp);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsExpend(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const filteredOptions = options.filter((option) => option.text.toString().includes(search));

    const handleResetValue = () => {
        setValue(multiple ? [] : '');
        setIsExpend(false);
    };

    return (
        <>
            <div className={styles.field}>
                {label && (
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
                )}
                <div
                    ref={wrapperRef}
                    role='listbox'
                    tabIndex='0'
                    name={name}
                    className={`${styles.ui} ${styles.dropdown} ${
                        isExpend && styles.active
                    } ${isExpend && styles.visible} ${multiple ? styles.multiple : ''}`}
                    onFocus={handleExpend}
                >
                    {multiple
                    && options.map((option) => value.includes(option.value) && (
                        <SelectedOption
                            key={option.key}
                            option={option}
                            value={value}
                            setValue={setValue}
                        />
                    ))}
                    {searchable && (
                        <input
                            ref={inputRef}
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    )}
                    {!multiple && value && search === '' && (
                        <div className={`${styles.divider} ${styles.text}`}>
                            {options.map((option) => option.value === value && option.text)}
                        </div>
                    )}
                    {value === '' || value.length === 0 ? (
                        <i
                            className={`las la-caret-down ${styles.dropdown} ${styles.icon}`}
                        />
                    ) : (
                        // eslint-disable-next-line jsx-a11y/control-has-associated-label
                        <i
                            className={`las la-times-circle ${styles.dropdown} ${styles.icon}`}
                            onClick={handleResetValue}
                            onKeyDown={handleResetValue}
                            tabIndex={0}
                            role='button'
                        />
                    )}
                    <div
                        className={`${isExpend && styles.visible} ${styles.menu} ${styles[position]}`}
                    >
                        {filteredOptions.map((option) => (
                            <Option
                                key={option.key}
                                option={option}
                                onClick={(item) => handleItemClick(item)}
                                value={value}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    position: PropTypes.oneOf(['up', 'down']),
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({
        }),
    ]),
    tip: PropTypes.string,
    iconTip: PropTypes.string,
};

Dropdown.defaultProps = {
    name: '',
    label: '',
    position: 'down',
    multiple: false,
    searchable: false,
    defaultValue: '',
    tip: '',
    iconTip: 'la-question-circle',
};
