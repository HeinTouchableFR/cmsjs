import React from 'react';
import { useIntl } from 'react-intl';
import styles from './AddDisposition.module.scss';

export default function AddDisposition({ handleAddDisposition }) {
    const intl = useIntl();

    return (
        <>
            <div className={`${styles.AddDisposition}`}>
                <button onClick={handleAddDisposition}>+</button>
                <p>{intl.formatMessage({ id: 'addLayoutTooltip' })}</p>
            </div>
        </>
    );
}
