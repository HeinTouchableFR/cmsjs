import React from 'react';
import styles from 'components/Modal/Modal.module.scss';
import PropTypes from 'prop-types';

export default function Header({ title, icon }) {
    return (
        <>
            <div className={styles.header}>
                {icon && <span className={`fas ${icon} ${styles.icon}`} />}
                <h2>{title}</h2>
            </div>
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Header.defaultProps = {
    icon: '',
};
