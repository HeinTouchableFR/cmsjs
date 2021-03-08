import React from 'react';
import { useIntl } from 'react-intl';

import styles from './AddLayout.module.scss';

export default function AddLayout({ handleAddLayout }) {
    const intl = useIntl();

    return (
        <>
            <div className={`${styles.addLayout}`}>
                <button onClick={handleAddLayout}>+</button>
                //TODO
                <p>{intl.formatMessage({ id: 'layout.tooltip.add', defaultMessage: 'Click on the + button to insert a layout' })}</p>
            </div>
        </>
    );
}
