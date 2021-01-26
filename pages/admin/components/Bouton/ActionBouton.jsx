import styles from './actionbouton.module.scss'
import React from "react";
import Link from "next/link";


export default function ActionBouton({url, icon, action, style, id}) {

    let couleur = null

    switch (style) {
        case 'voir':
            couleur = styles.voir
            break;
        case 'modifier':
            couleur = styles.modifier
            break;
        case 'supprimer':
            couleur = styles.supprimer
            break;
        default:
            couleur = styles.base
            break;
    }

    return (
        <Link href={"/admin/" + url + "/" + action + "/" + id}>
            <a className={styles.actionBouton + " " + couleur}>
                <i className={"fas " + icon}/>
            </a>
        </Link>
    )
}
