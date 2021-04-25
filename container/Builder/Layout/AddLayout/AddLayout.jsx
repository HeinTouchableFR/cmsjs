import React from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import styles from './AddLayout.module.scss';

export default function AddLayout({ handleAddLayout }) {
    return (
        <>
            <div className={`${styles.addLayout}`}>
                <button
                    className={`${styles.addLayoutBtn}`}
                    onClick={handleAddLayout}
                    type='button'
                >
                    <i className='far fa-plus' />
                </button>
                <FormattedMessage
                    id='layout.tooltip.add'
                    defaultMessage='Click on the + button to insert a layout'
                />
            </div>
        </>
    );
}

AddLayout.propTypes = {
    handleAddLayout: PropTypes.func.isRequired,
};
