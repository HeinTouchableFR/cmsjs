import React from 'react';
import styles from 'components/Form/Tooltip/Tooltip.module.scss';
import PropTypes from 'prop-types';

export default function Tooltip({ iconTip,
    tip }) {
    console.log(iconTip)
    return (
        <>
            <div className={styles.tooltip}>
                <i className={`las ${iconTip}`} />
                <span>{tip}</span>
            </div>
        </>
    );
}

Tooltip.propTypes = {
    tip: PropTypes.string.isRequired,
    iconTip: PropTypes.string,
};

Tooltip.defaultProps = {
    iconTip: 'la-question-circle',
};
