import React from 'react';
import styles from 'components/Tab/Tab.module.scss';
import PropTypes from 'prop-types';

export default function Pane({ children }) {

    return (
        <>
            <div className={styles.tab}>
                {children}
            </div>
        </>

    );
}

Pane.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};

Pane.defaultProps = {

};
