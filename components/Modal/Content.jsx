import React from 'react';
import styles from 'components/Modal/Modal.module.scss';
import PropTypes from 'prop-types';

export default function Content({ children }) {
    return (
        <>
            <div className={styles.content}>
                {children}
            </div>
        </>
    );
}

Content.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};
