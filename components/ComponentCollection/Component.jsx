import PropTypes from 'prop-types';
import React from 'react';
import styles from './Component.module.scss';

export default function Component({ icon, label, color, onClick }) {
    return (
        <>
            <div
                className={`${styles.component} ${styles[color]}`}
                onClick={onClick}
                onKeyDown={onClick}
                role='button'
                tabIndex={0}
            >
                <i className={`fas ${icon}`} />
                <div className={`${styles.label}`}>{label}</div>
            </div>
        </>
    );
}

Component.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
};

Component.defaultProps = {
    onClick: () => {},
};
