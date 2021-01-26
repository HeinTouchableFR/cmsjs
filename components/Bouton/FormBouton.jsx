import styles from './formbouton.module.scss'
import React from "react";


export default function FormBouton({label, type,disabled}) {

    return (
        <button className={styles.formBouton} disabled={disabled} type={type}>
            {label}
        </button>
    )
}
