import React from 'react';

import styles from './FormButton.module.scss';

export default function FormButton({ label, type, disabled }) {
    return (
        <button className={styles.FormButton} disabled={disabled} type={type}>
            {label}
        </button>
    );
}
