import React from 'react';
import styles from './Component.module.scss'

export default function Component({tag, label, color, onClick}) {
    return (
        <>
            <div className={`${styles.component} ${styles[color]}`} onClick={onClick}>
                <div className={`${styles.tag}`}>{tag}</div>
                <div className={`${styles.label}`}>{label}</div>
            </div>
        </>
    );
}
