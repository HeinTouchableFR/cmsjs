import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

export function Button({ url, icon, action, target, style, id }) {
    let color;

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
            <a target={target ? '_blank' : '_self'} className={styles.button + ' ' + color}>
                <i className={'fas ' + icon} />
            </a>
        </Link>
    );
}

