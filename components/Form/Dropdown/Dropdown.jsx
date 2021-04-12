import React, { useEffect, useRef, useState } from 'react';
import styles from 'components/Form/Dropdown/Dropdown.module.scss';
import PropTypes from 'prop-types';

export default function Dropdown({
    name,
    options = [],
    multiple,
    defaultValue,
    onChange,
}) {
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const [isExpend, setIsExpend] = useState(false);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(defaultValue || (multiple ? [] : ''));
    const handleExpend = () => {
        setIsExpend(true);
    };
    const handleItemClick = (item) => {
        let tmp;
        if (multiple) {
            tmp = value.includes(item.value)
                ? value.filter((value) => value !== item.value)
                : [...value, item.value];
        } else {
            tmp = item.value;
            setIsExpend(false);
            setSearch('');
        }
        setValue(tmp);
        handleChange(tmp);
    };

    const handleChange = (value) => {
        const data = { name, value };
        onChange(wrapperRef, data);
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

    const Option = ({ option }) => {
        const handleClick = () => {
            handleItemClick(option);
        };
        const isSelected = value.includes(option.value);

        return (
            <>
                <div
                    className={`${styles.item} ${isSelected && styles.selected}`}
                    onClick={handleClick}
                >
                    <span className='text'>
                        {option.content ? option.content : option.text}
                    </span>
                </div>
            </>
        );
    };

    const SelectedOption = ({ option }) => {
        const handleDeleteOption = () => {
            setValue(value.filter((value) => value !== option.value));
        };
        return (
            <>
                <a className={`${styles.ui} ${styles.label}`}>
                    {option.text}
                    <i
                        className={`las la-times-circle ${styles.dropdown}`}
                        onClick={handleDeleteOption}
                    />
                </a>
            </>
        );
    };

    const handleResetValue = () => {
        multiple ? setValue([]) : setValue('');
        setIsExpend(false);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                name={name}
                className={`${styles.ui} ${styles.dropdown} ${
                    isExpend && styles.active
                } ${isExpend && styles.visible} ${multiple ? styles.multiple : ''}`}
                onFocus={handleExpend}
                onClick={() => {
                    inputRef.current.focus();
                }}
            >
                {multiple
          && options.map(
              (option) => value.includes(option.value) && (
                  <SelectedOption key={option.key} option={option} />
              ),
          )}
                <input
                    ref={inputRef}
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                    <i
                        className={`las la-times-circle ${styles.dropdown} ${styles.icon}`}
                        onClick={handleResetValue}
                    />
                )}
                <div className={`${isExpend && styles.visible} ${styles.menu}`}>
                    {filteredOptions.map((option) => (
                        <Option key={option.key} option={option} />
                    ))}
                </div>
            </div>
        </>
    );
}

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    option: PropTypes.objectOf({
        key: PropTypes.string.isRequired,
    }).isRequired,
    options: PropTypes.arrayOf().isRequired,
    multiple: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
