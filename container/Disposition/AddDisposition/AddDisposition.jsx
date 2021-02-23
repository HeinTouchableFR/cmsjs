import React from 'react';
import styles from './AddDisposition.module.scss';
import useTranslation from 'intl/useTranslation';

export default function AddDisposition({ handleAddDisposition }) {
    const { t } = useTranslation();
    return (
        <>
            <div className={`${styles.AddDisposition}`}>
                <button onClick={handleAddDisposition}>+</button>
                <p>{t('addLayoutTooltip')}</p>
            </div>
        </>
    );
}
