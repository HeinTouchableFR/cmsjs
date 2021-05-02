import PropTypes from 'prop-types';
import React from 'react';
import styles from './Component.module.scss';

export default function Component({ tag, label, color, onClick }) {
    return (
        <>
            <div
                className={`${styles.component} ${styles[color]}`}
                onClick={onClick}
                role='button'
            >
                <div className={`${styles.tag}`}>{tag}</div>
                <div className={`${styles.label}`}>{label}</div>
            </div>
        </>
    );
}

Component.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
};
