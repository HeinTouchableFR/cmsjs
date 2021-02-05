import React from "react";
import Link from "next/link";
import styles from './builder.module.scss'

export default function AjouterDisposition({handleAddDisposition}) {

    return (
        <div className={`${styles.ajouterDisposition}`}>
            <button onClick={handleAddDisposition}>+</button>
            <p>Cliquer sur le bouton + pour insérer une disposition</p>
        </div>
    )
}
