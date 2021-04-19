import React from 'react';
import styles from 'components/Modal/Modal.module.scss';
import PropTypes from 'prop-types';

export default function Footer({ children }) {
    return (
        <>
            <div className={styles.footer}>
                {children}
            </div>
        </>
    );
}

Footer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};
