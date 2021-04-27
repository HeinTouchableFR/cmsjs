import PropTypes from 'prop-types';
import React from 'react';
import styles from './Grid.module.scss';

export default function Column({ align,
    width,
    children }) {
    let alignment;
    switch (align) {
    case 'left':
        alignment = styles.align_left;
        break;
    case 'center':
        alignment = styles.align_center;
        break;
    case 'right':
        alignment = styles.align_right;
        break;
    default:
        alignment = styles.align_left;
        break;
    }

    return (
        <>
            <div className={`${styles.column} ${alignment} ${width && styles[width]}`}>
                {children}
            </div>
        </>
    );
}

Column.propTypes = {
    align: PropTypes.string,
    width: PropTypes.oneOf(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', '']),
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.string,
        PropTypes.bool,
    ]).isRequired,
};

Column.defaultProps = {
    align: 'left',
    width: '',
};
