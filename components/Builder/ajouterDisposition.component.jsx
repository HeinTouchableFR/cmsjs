import React from "react";
import Link from "next/link";
import styles from './builder.module.scss'
import useTranslation from '../../intl/useTranslation';

export default function AjouterDisposition({handleAddDisposition}) {
    const {t} = useTranslation();
    return (
        <div className={`${styles.ajouterDisposition}`}>
            <button onClick={handleAddDisposition}>+</button>
            <p>{t('addLayoutTooltip')}</p>
        </div>
    )
}
