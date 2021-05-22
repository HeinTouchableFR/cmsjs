import React from 'react';
import styles from 'components/Form/Tooltip/Tooltip.module.scss';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

export default function Tooltip({ iconTip,
    tip,
    tipWidth }) {
    return (
        <>
            <div className={styles.tooltip}>
                <i className={`las ${iconTip}`} />
                <span
                    style={{
                        width: `${tipWidth}px`, marginLeft: `-${tipWidth / 2}px`,
                    }}
                >
                    {parse(tip)}
                </span>
            </div>
        </>
    );
}

Tooltip.propTypes = {
    tip: PropTypes.string.isRequired,
    iconTip: PropTypes.string,
    tipWidth: PropTypes.number,
};

Tooltip.defaultProps = {
    iconTip: 'la-question-circle',
    tipWidth: null,
};
