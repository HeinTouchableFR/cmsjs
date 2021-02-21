import styles from './Form.module.scss';
import React from 'react';

export default function Form({ onSubmit, children }) {
    return (
        <>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </>
    );
}
