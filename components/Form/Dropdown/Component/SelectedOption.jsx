import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dropdown.module.scss';

export default function SelectedOption({ option, value, setValue }) {
    const handleDeleteOption = () => {
        setValue(value.filter((worth) => worth !== option.value));
    };
    return (
        <>
            <div className={`${styles.ui} ${styles.label}`}>
                {option.text}
                <i
                    className={`las la-times-circle ${styles.dropdown}`}
                    onClick={handleDeleteOption}
                    onKeyDown={handleDeleteOption}
                    tabIndex='0'
                    role='button'
                />
            </div>
        </>
    );
}

SelectedOption.propTypes = {
    option: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
        }).isRequired),
        PropTypes.shape({
            key: PropTypes.string.isRequired,
        }),
    ]).isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.arrayOf({
        }),
        PropTypes.shape({
        }),
        PropTypes.array,
    ]).isRequired,
};
