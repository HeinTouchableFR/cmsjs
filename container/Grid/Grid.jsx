import PropTypes from 'prop-types';
import React from 'react';
import styles from './Grid.module.scss';
import Column from './Column';

export default function Grid({ children, columns }) {
    return (
        <>
            <div
                className={styles.grid}
                style={{
                    '--i': columns,
                }}
            >
                {children}
            </div>
        </>
    );
}

Grid.Column = Column;

Grid.propTypes = {
    columns: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};

Grid.defaultProps = {
};
