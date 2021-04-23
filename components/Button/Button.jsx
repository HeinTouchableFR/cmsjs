import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.scss';
import Loader from '../Loader/Loader';

export default function Button({ label, onClick, icon, type, loading, disabled, form, name, id }) {
    return (
        <>
            <button
                onClick={onClick}
                className={styles.button}
                /* eslint-disable-next-line react/button-has-type */
                type={type}
                disabled={disabled || loading}
                form={form}
                name={name}
                id={id}
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
    form: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
};

Button.defaultProps = {
    onClick: null,
    icon: '',
    form: null,
    name: null,
    id: null,
    loading: false,
    disabled: false,
    type: 'button',
};
