import React from 'react';
import Link from 'next/link';

import styles from './ActionButton.module.scss';

export function ActionButton({ url, icon, action, style, id }) {
    let color = null;

    switch (style) {
        case 'show':
            color = styles.show;
            break;
        case 'edit':
            color = styles.edit;
            break;
        case 'delete':
            color = styles.delete;
            break;
        default:
            color = styles.base;
            break;
    }

    return (
        <Link href={action ? '/admin/' + url + '/' + action + '/' + id : url} >
            <a target={action ? '_self' : '_blank'} className={styles.ActionButton + ' ' + color}>
                <i className={'fas ' + icon} />
            </a>
        </Link>
    );
}

export function ActionButtonNoLink({ icon, style, onClick, type }) {
    let color = null;

    switch (style) {
        case 'show':
            color = styles.show;
            break;
        case 'edit':
            color = styles.edit;
            break;
        case 'delete':
            color = styles.delete;
            break;
        default:
            color = styles.base;
            break;
    }

    const handleClick = function () {
        onClick();
    };

    return (
        <button onClick={handleClick} type={type} className={styles.ActionButton + ' ' + color}>
            <i className={'fas ' + icon} />
        </button>
    );
}
