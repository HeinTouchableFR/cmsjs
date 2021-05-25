import React from 'react';
import styles from 'components/Form/Field/Field.module.scss';
import PropTypes from 'prop-types';
import Tooltip from 'components/Form/Tooltip/Tooltip';

export default function Field({ label,
    subLabel,
    name,
    iconTip,
    tip,
    tipWidth,
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
                        tipWidth={tipWidth}
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
    subLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
        }),
        PropTypes.arrayOf({
        }),
    ]),
    tip: PropTypes.string,
    tipWidth: PropTypes.number,
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
    tipWidth: null,
    iconTip: 'fa-question-circle',
};
