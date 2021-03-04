import React from 'react';
import { useIntl } from 'react-intl';

import styles from './AddDisposition.module.scss';

export default function AddDisposition({ handleAddDisposition }) {
    const intl = useIntl();

    return (
        <>
            <div className={`${styles.AddDisposition}`}>
                <button onClick={handleAddDisposition}>+</button>
                <p>{intl.formatMessage({ id: 'layout.tooltip.add', defaultMessage: 'Click on the + button to insert a layout' })}</p>
            </div>
        </>
    );
}
