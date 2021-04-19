import React from 'react';
import styles from 'components/Portal/Portal.module.scss';
import PropTypes from 'prop-types';

export default function Pallet({ children }) {
    return (
        <>
            <div className={styles.pallet_container}>
                <div className={styles.pallet}>
                    {children}
                </div>
            </div>
        </>
    );
}

Pallet.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};
