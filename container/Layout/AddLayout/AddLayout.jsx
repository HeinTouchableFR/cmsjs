import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './AddLayout.module.scss';

export default function AddLayout({ handleAddLayout }) {
    return (
        <>
            <div className={`${styles.addLayout}`}>
                <button className={`${styles.addLayoutBtn}`}onClick={handleAddLayout}>
                    <i className="far fa-plus" />
                </button>
                <FormattedMessage id='layout.tooltip.add' defaultMessage='Click on the + button to insert a layout' />
            </div>
        </>
    );
}
