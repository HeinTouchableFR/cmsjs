import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.scss';

export default function Button({ label, onClick, icon, type }) {
    return (
        <>
            <button
                onClick={onClick}
                className={styles.button}
                /* eslint-disable-next-line react/button-has-type */
                type={type}
            >
                {label}
                {icon && <span className={icon} />}
            </button>
        </>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
};

Button.defaultProps = {
    onClick: null,
    icon: '',
    type: 'button',
};
