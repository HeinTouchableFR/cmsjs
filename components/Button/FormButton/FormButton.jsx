import styles from './FormButton.module.scss';
import React from 'react';

export default function FormButton({ label, type, disabled }) {
    return (
        <button className={styles.FormButton} disabled={disabled} type={type}>
            {label}
        </button>
    );
}
