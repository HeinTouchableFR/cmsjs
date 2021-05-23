import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dropdown.module.scss';

export default function Option({ option, onClick, value }) {
    const handleClick = () => {
        onClick(option);
    };
    const isSelected = value.includes(option.value.toString());

    return (
        <>
            <div
                className={`${styles.item} ${isSelected && styles.selected}`}
                onClick={handleClick}
                onKeyDown={handleClick}
                role='option'
                aria-selected={value.includes(option.value.toString())}
                tabIndex='0'
            >
                <span className='text'>
                    {option.content ? option.content : option.text.toString()}
                </span>
            </div>
        </>
    );
}

Option.propTypes = {
    option: PropTypes.shape({
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
    }.isRequired).isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
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
