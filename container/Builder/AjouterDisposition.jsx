import React from 'react';
import styles from './builder.module.scss';
import useTranslation from '../../intl/UseTranslation';

export default function AjouterDisposition({ handleAddDisposition }) {
    const { t } = useTranslation();
    return (
        <div className={`${styles.ajouterDisposition}`}>
            <button onClick={handleAddDisposition}>+</button>
            <p>{t('addLayoutTooltip')}</p>
        </div>
    );
}
