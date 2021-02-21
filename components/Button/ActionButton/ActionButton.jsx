import React from 'react';
import Link from 'next/link';

import styles from './ActionButton.module.scss';

export function ActionButton({ url, icon, action, style, id }) {
    let couleur = null;

    switch (style) {
        case 'voir':
            couleur = styles.voir;
            break;
        case 'modifier':
            couleur = styles.modifier;
            break;
        case 'supprimer':
            couleur = styles.supprimer;
            break;
        default:
            couleur = styles.base;
            break;
    }

    return (
        <Link href={action ? '/admin/' + url + '/' + action + '/' + id : '#'}>
            <a className={styles.ActionButton + ' ' + couleur}>
                <i className={'fas ' + icon} />
            </a>
        </Link>
    );
}

export function ActionButtonNoLink({ icon, style, onClick, type }) {
    let couleur = null;

    switch (style) {
        case 'voir':
            couleur = styles.voir;
            break;
        case 'modifier':
            couleur = styles.modifier;
            break;
        case 'supprimer':
            couleur = styles.supprimer;
            break;
        default:
            couleur = styles.base;
            break;
    }

    const handleClick = function () {
        onClick();
    };

    return (
        <button onClick={handleClick} type={type} className={styles.ActionButton + ' ' + couleur}>
            <i className={'fas ' + icon} />
        </button>
    );
}
