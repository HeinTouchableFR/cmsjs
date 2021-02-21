import styles from './Input.module.scss';
import React from 'react';

export default function InputForm({ label, nom, type, valeur, onChange }) {
    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor={nom}>{label}</label>
                <input type={type} name={nom} id={nom} placeholder={label} onChange={onChange} defaultValue={valeur} />
            </div>
        </>
    );
}
