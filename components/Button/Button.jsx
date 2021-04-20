import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.scss';
import Loader from '../Loader/Loader';

export default function Button({ label, onClick, icon, type, loading, disabled }) {
    return (
        <>
            <button
                onClick={onClick}
                className={styles.button}
                /* eslint-disable-next-line react/button-has-type */
                type={type}
                disabled={disabled || loading}
            >
                {loading
                    ? <Loader size='small' />
                    : (
                        <>
                            {label}
                            {icon && <span className={icon} />}
                        </>
                  )}
            </button>
        </>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
};

Button.defaultProps = {
    onClick: null,
    icon: '',
    loading: false,
    disabled: false,
    type: 'button',
};
