import React from 'react';
import styles from 'components/Form/Field/Field.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

export default function Field({ label,
    subLabel,
    name,
    iconTip,
    tip,
    children }) {
    return (
        <>
            <div className={`${styles.field}`}>
                <label
                    className={`${styles.label}`}
                    htmlFor={name}
                >
                    {label}
                    {' '}
                    {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
                    {tip && (
                    <Tooltip
                        tip={tip}
                        iconTip={iconTip}
                    />
                    )}
                </label>
                <div className={`${styles.ui}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    tip: PropTypes.string,
    iconTip: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.string,
    ]).isRequired,
};

Field.defaultProps = {
    label: '',
    subLabel: '',
    tip: '',
    iconTip: 'la-question-circle',
};
