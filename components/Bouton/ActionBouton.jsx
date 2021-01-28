import styles from './actionbouton.module.scss'
import React from "react";
import Link from "next/link";


export function ActionBouton({url, icon, action, style, id}) {

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
        <Link href={action ? "/admin/" + url + "/" + action + "/" + id : '#'}>
            <a className={styles.actionBouton + " " + couleur}>
                <i className={"fas " + icon}/>
            </a>
        </Link>
    )
}

export function ActionBoutonNoLink({icon, style, onClick, type}) {

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

    const handleClick = function () {
        onClick()
    }

    return (
        <button onClick={handleClick} type={type} className={styles.actionBouton + " " + couleur}>
            <i className={"fas " + icon}/>
        </button>
    )
}
